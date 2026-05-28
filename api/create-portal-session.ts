import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const APP_URL = process.env.APP_URL ?? "https://manda-um-zap.vercel.app";

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", APP_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { userId } = req.body as { userId?: unknown };

  if (typeof userId !== "string") {
    return res.status(400).json({ error: "userId inválido" });
  }

  // 1. Tenta usar o stripe_customer_id salvo no perfil (preenchido pelo webhook)
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single();

  let customerId = (profile?.stripe_customer_id as string | null) ?? null;

  // 2. Fallback: busca cliente pelo e-mail via Stripe API (usuários legados)
  if (!customerId) {
    const { data: authData } = await supabaseAdmin.auth.admin.getUserById(userId);
    const email = authData?.user?.email;

    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      customerId = customers.data[0]?.id ?? null;
    }
  }

  if (!customerId) {
    return res
      .status(404)
      .json({ error: "Nenhuma assinatura encontrada para este usuário." });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${APP_URL}/minha-conta/pagamentos`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    console.error("[create-portal-session]", msg);
    return res.status(500).json({ error: msg });
  }
}
