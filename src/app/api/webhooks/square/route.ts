import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { trackEvent } from "@/lib/klaviyo";
import { lookupOrderEmail } from "@/lib/order-email-store";

export const dynamic = "force-dynamic";

type SquarePayment = {
  id: string;
  status: string;
  amount_money?: { amount: number; currency: string };
  buyer_email_address?: string;
  order_id?: string;
};

type SquareWebhookEvent = {
  merchant_id: string;
  type: string;
  event_id: string;
  created_at: string;
  data: {
    type: string;
    id: string;
    object: { payment?: SquarePayment };
  };
};

function verifySignature(
  rawBody: string,
  notificationUrl: string,
  signatureHeader: string,
  signatureKey: string
): boolean {
  const expected = crypto
    .createHmac("sha256", signatureKey)
    .update(notificationUrl + rawBody)
    .digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL;

  if (!signatureKey || !notificationUrl) {
    console.error("Square webhook env vars missing");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const signature = request.headers.get("x-square-hmacsha256-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await request.text();

  if (!verifySignature(rawBody, notificationUrl, signature, signatureKey)) {
    console.error("Square webhook signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: SquareWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payment = event.data?.object?.payment;
  const isPaymentEvent =
    event.type === "payment.updated" || event.type === "payment.created";

  if (!isPaymentEvent || !payment || payment.status !== "COMPLETED") {
    return NextResponse.json({ received: true });
  }

  let email = payment.buyer_email_address;
  let buyerName: string | undefined;
  if (!email && payment.order_id) {
    const stored = await lookupOrderEmail(payment.order_id);
    if (stored) {
      email = stored.email;
      buyerName = stored.name;
    }
  }

  if (!email) {
    console.warn(
      "Square payment completed but no email found (webhook + store miss)",
      payment.id
    );
    return NextResponse.json({ received: true });
  }

  const amountDollars = payment.amount_money
    ? payment.amount_money.amount / 100
    : undefined;

  try {
    await trackEvent({
      email,
      metric: "Audit Purchased",
      uniqueId: event.event_id,
      time: event.created_at,
      value: amountDollars,
      properties: {
        payment_id: payment.id,
        order_id: payment.order_id,
        currency: payment.amount_money?.currency,
        amount: amountDollars,
        buyer_name: buyerName,
      },
    });
  } catch (err) {
    console.error("Klaviyo event failed:", err);
    return NextResponse.json({ error: "Downstream failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
