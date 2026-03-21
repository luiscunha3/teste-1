import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Webhook signature verification failed", { status: 400 });
  }

  const session = event.data.object as unknown as Record<string, unknown>;

  switch (event.type) {
    case "checkout.session.completed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const invoice = subscription.latest_invoice;
      const invoiceObj = typeof invoice === "string"
        ? await stripe.invoices.retrieve(invoice)
        : invoice;

      await db.user.update({
        where: { stripeCustomerId: session.customer as string },
        data: {
          plan: "PRO",
          stripePriceId: subscription.items.data[0].price.id,
          stripeSubscriptionId: subscription.id,
          stripeCurrentPeriodEnd: invoiceObj && typeof invoiceObj === "object" && "period_end" in invoiceObj
            ? new Date((invoiceObj as { period_end: number }).period_end * 1000)
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      break;
    }

    case "invoice.payment_succeeded": {
      const subscriptionId = session.subscription as string;
      const periodEnd = session.period_end as number;

      await db.user.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      await db.user.updateMany({
        where: { stripeSubscriptionId: session.id as string },
        data: {
          plan: "FREE",
          stripePriceId: null,
          stripeSubscriptionId: null,
          stripeCurrentPeriodEnd: null,
        },
      });
      break;
    }
  }

  return new NextResponse(null, { status: 200 });
}
