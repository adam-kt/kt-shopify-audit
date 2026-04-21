import { NextRequest, NextResponse } from "next/server";
import { square } from "@/lib/square";
import { rememberOrderEmail } from "@/lib/order-email-store";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!locationId || locationId === "replace_me") {
      return NextResponse.json(
        {
          error:
            "Square Location ID not configured. Set SQUARE_LOCATION_ID in .env.local",
        },
        { status: 500 }
      );
    }

    let email: string | undefined;
    let name: string | undefined;
    try {
      const body = await request.json();
      if (typeof body?.email === "string" && body.email.includes("@")) {
        email = body.email;
      }
      if (typeof body?.name === "string" && body.name.trim().length > 0) {
        name = body.name.trim();
      }
    } catch {
      // no body — proceed without prepopulated email
    }

    const response = await square.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      quickPay: {
        name: "Shopify Conversion Audit",
        priceMoney: {
          amount: BigInt(75000), // $750.00 in cents
          currency: "USD",
        },
        locationId,
      },
      ...(email && { prePopulatedData: { buyerEmail: email } }),
      checkoutOptions: {
        redirectUrl: `${siteUrl}/success`,
        askForShippingAddress: false,
      },
    });

    const url = response.paymentLink?.url;
    const orderId = response.paymentLink?.orderId;

    if (!url) {
      return NextResponse.json(
        { error: "Failed to create payment link" },
        { status: 500 }
      );
    }

    if (orderId && email) {
      await rememberOrderEmail(orderId, email, name);
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Square checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
