import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Stripe precisa do body raw (bytes) para verificar a assinatura HMAC.
// Desativa o body-parser automático do Vercel.
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Admin client ignora RLS — necessário para webhook (sem sessão de usuário)
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/** Lê o body bruto do stream da request */
function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig       = req.headers["stripe-signature"] as string | undefined;
  const rawBody   = await getRawBody(req);
  const secret    = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig ?? "", secret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    console.error("[webhook] Assinatura inválida:", msg);
    return res.status(400).json({ error: `Webhook Error: ${msg}` });
  }

  // ─── checkout.session.completed ────────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session  = event.data.object as Stripe.Checkout.Session;
    const meta     = session.metadata ?? {};
    const userId   = meta.user_id;
    const agentIds = meta.agent_ids;

    if (!userId || !agentIds) {
      // Eventos sem metadata esperados não devem causar retry — retornar 200
      console.warn("[webhook] Metadata ausente no evento:", session.id);
      return res.status(200).json({ received: true });
    }

    const ids = agentIds.split(",").map((s) => s.trim()).filter(Boolean);

    // 1. Ativa os agentes no banco
    const { error: agentErr } = await supabaseAdmin
      .from("agent_configs")
      .update({ active: true })
      .eq("user_id", userId)
      .in("agent_id", ids);

    if (agentErr) {
      console.error("[webhook] Erro ao ativar agentes:", agentErr);
      return res.status(500).json({ error: "Falha ao ativar agentes" });
    }

    // 2. Atualiza plano no perfil
    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .update({ plan: "paid", plan_status: "active" })
      .eq("id", userId);

    if (profileErr) {
      // Não falha o webhook — agentes já foram ativados
      console.warn("[webhook] Não foi possível atualizar perfil:", profileErr);
    }

    console.log(`[webhook] ✅ Agentes [${ids.join(", ")}] ativados para usuário ${userId}`);
  }

  // ─── customer.subscription.deleted ─────────────────────────────────────────
  if (event.type === "customer.subscription.deleted") {
    const sub  = event.data.object as Stripe.Subscription;
    const meta = sub.metadata ?? {};
    const userId = meta.user_id;

    if (userId) {
      await supabaseAdmin
        .from("agent_configs")
        .update({ active: false })
        .eq("user_id", userId);

      await supabaseAdmin
        .from("profiles")
        .update({ plan_status: "inactive" })
        .eq("id", userId);

      console.log(`[webhook] ⛔ Assinatura cancelada — agentes desativados para ${userId}`);
    }
  }

  return res.status(200).json({ received: true });
}
