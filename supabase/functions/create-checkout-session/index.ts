import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { corsHeaders } from "../_shared/cors.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { paymentType, userId, userEmail, successUrl, cancelUrl } =
      await req.json() as {
        paymentType: "monthly" | "annual";
        userId: string;
        userEmail: string;
        successUrl: string;
        cancelUrl: string;
      };

    const isAnnual = paymentType === "annual";
    const priceId = isAnnual
      ? Deno.env.get("STRIPE_PRICE_ANNUAL")!
      : Deno.env.get("STRIPE_PRICE_MONTHLY")!;

    if (!priceId) {
      throw new Error(`Stripe price ID não configurado para: ${paymentType}`);
    }

    const session = await stripe.checkout.sessions.create({
      mode: isAnnual ? "payment" : "subscription",
      payment_method_types: isAnnual ? ["pix", "card"] : ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      customer_email: userEmail || undefined,
      metadata: {
        userId,
        planName: "pro",
        paymentType,
      },
      locale: "pt-BR",
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
