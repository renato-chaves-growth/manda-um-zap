import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const APP_URL = process.env.APP_URL ?? "https://manda-um-zap.vercel.app";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", APP_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body as {
    agentIds?: unknown;
    userId?: unknown;
    ciclo?: unknown;
  };

  const agentIds = body.agentIds;
  const userId   = body.userId;
  const ciclo    = body.ciclo;

  if (
    !Array.isArray(agentIds) ||
    agentIds.length === 0 ||
    typeof userId !== "string" ||
    (ciclo !== "monthly" && ciclo !== "annual")
  ) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  const isAnnual = ciclo === "annual";

  // Preços em centavos BRL
  // Mensal:  R$29,00/agente/mês  → 2900
  // Anual:   R$23,20/agente/mês × 12 = R$278,40/agente/ano → 27840
  const unitAmount = isAnnual ? 27840 : 2900;
  const interval   = isAnnual ? ("year" as const) : ("month" as const);

  const agentLabel = agentIds.join(", ");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "pt-BR",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `MandaUmZap · ${agentIds.length} agente${agentIds.length > 1 ? "s" : ""}`,
              description: `Agentes: ${agentLabel} · ${isAnnual ? "plano anual" : "plano mensal"}`,
              images: ["https://manda-um-zap.vercel.app/og-image.png"],
            },
            recurring: { interval },
            unit_amount: unitAmount,
          },
          quantity: agentIds.length,
        },
      ],
      metadata: {
        user_id: userId,
        agent_ids: agentIds.join(","),
        ciclo,
      },
      success_url: `${APP_URL}/minha-conta/agentes?pagamento=sucesso`,
      cancel_url:  `${APP_URL}/carrinho?agentes=${agentIds.join(",")}`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    console.error("[create-checkout-session]", msg);
    return res.status(500).json({ error: msg });
  }
}
