import { NextRequest, NextResponse } from "next/server";
import { upsertProfile, subscribeToList } from "@/lib/klaviyo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, storeUrl, message } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const listId = process.env.KLAVIYO_LIST_ID;
    if (!listId) {
      console.error("KLAVIYO_LIST_ID missing");
      return NextResponse.json(
        { error: "Lead capture is not configured" },
        { status: 500 }
      );
    }

    const [firstName, ...rest] = (name ?? "").trim().split(/\s+/);
    const lastName = rest.join(" ") || undefined;

    const properties: Record<string, string> = {};
    if (storeUrl) properties.store_url = storeUrl;
    if (message) properties.message = message;

    await upsertProfile({
      email,
      first_name: firstName || undefined,
      last_name: lastName,
      properties: Object.keys(properties).length > 0 ? properties : undefined,
    });

    await subscribeToList(email, listId, "Audit landing page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 502 }
    );
  }
}
