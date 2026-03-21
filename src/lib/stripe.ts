import Stripe from "stripe";

// Lazy init pattern — prevents build crashes when STRIPE_SECRET_KEY is missing
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    const client = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    });
    return Reflect.get(client, prop);
  },
});
