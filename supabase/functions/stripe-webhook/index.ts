import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature error";
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }

  // Payment confirmed → activate plan
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id ?? session.metadata?.userId;
    const planName = session.metadata?.planName ?? "comecar";

    if (userId) {
      await supabase
        .from("profiles")
        .update({ plan: planName, plan_status: "active" })
        .eq("id", userId);
    }
  }

  // Subscription cancelled → downgrade to free
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = (subscription.metadata as Record<string, string>)?.userId;
    if (userId) {
      await supabase
        .from("profiles")
        .update({ plan: "free", plan_status: "inactive" })
        .eq("id", userId);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
