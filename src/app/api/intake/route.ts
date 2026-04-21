import { NextRequest, NextResponse } from "next/server";
import { upsertProfile, trackEvent } from "@/lib/klaviyo";

interface IntakePayload {
  email?: string;
  name?: string;
  storeUrl?: string;
  brandName?: string;
  category?: string;
  monthlyRevenue?: string;
  teamSize?: string;
  topProducts?: string;
  challenges?: string;
  crm?: string;
  analyticsTools?: string;
  priorities?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;
    const email = (body.email ?? "").trim().toLowerCase();
    const storeUrl = (body.storeUrl ?? "").trim();

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (!storeUrl) {
      return NextResponse.json(
        { error: "Store URL is required." },
        { status: 400 }
      );
    }

    const [firstName, ...rest] = (body.name ?? "").trim().split(/\s+/);
    const lastName = rest.join(" ") || undefined;

    // Save every answer as a Klaviyo profile property so the audit team has
    // the full intake context on the customer record.
    const properties: Record<string, string> = {};
    const add = (key: string, value?: string) => {
      const v = value?.trim();
      if (v) properties[key] = v;
    };
    add("store_url", storeUrl);
    add("brand_name", body.brandName);
    add("category", body.category);
    add("monthly_revenue", body.monthlyRevenue);
    add("team_size", body.teamSize);
    add("top_products", body.topProducts);
    add("challenges", body.challenges);
    add("crm", body.crm);
    add("analytics_tools", body.analyticsTools);
    add("priorities", body.priorities);
    add("intake_notes", body.notes);
    add("intake_submitted_at", new Date().toISOString());

    await upsertProfile({
      email,
      first_name: firstName || undefined,
      last_name: lastName,
      properties: Object.keys(properties).length > 0 ? properties : undefined,
    });

    // Fire an event so flows / internal alerts can key off a new intake.
    try {
      await trackEvent({
        email,
        metric: "Submitted Audit Intake",
        properties,
        uniqueId: `intake-${email}-${Date.now()}`,
      });
    } catch (e) {
      // Don't fail the whole submission if the event endpoint hiccups —
      // the profile is already saved.
      console.error("Klaviyo intake event failed:", e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Intake submission error:", error);
    return NextResponse.json(
      { error: "Could not save your intake form. Please try again." },
      { status: 502 }
    );
  }
}
