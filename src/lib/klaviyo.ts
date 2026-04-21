const KLAVIYO_REVISION = "2024-10-15";
const BASE = "https://a.klaviyo.com/api";

function getApiKey(): string {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!key) throw new Error("KLAVIYO_PRIVATE_API_KEY is not set");
  return key;
}

function headers() {
  return {
    Authorization: `Klaviyo-API-Key ${getApiKey()}`,
    accept: "application/vnd.api+json",
    "content-type": "application/vnd.api+json",
    revision: KLAVIYO_REVISION,
  };
}

export type ProfileAttributes = {
  email: string;
  first_name?: string;
  last_name?: string;
  properties?: Record<string, string>;
};

export async function upsertProfile(attrs: ProfileAttributes): Promise<string | undefined> {
  const createRes = await fetch(`${BASE}/profiles/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ data: { type: "profile", attributes: attrs } }),
  });

  if (createRes.status === 201) {
    const json = await createRes.json();
    return json?.data?.id;
  }

  if (createRes.status === 409) {
    const json = await createRes.json();
    const existingId = json?.errors?.[0]?.meta?.duplicate_profile_id;
    if (existingId) {
      await fetch(`${BASE}/profiles/${existingId}/`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({
          data: { type: "profile", id: existingId, attributes: attrs },
        }),
      });
    }
    return existingId;
  }

  const detail = await createRes.text();
  throw new Error(`Klaviyo profile upsert failed: ${createRes.status} ${detail}`);
}

export async function subscribeToList(
  email: string,
  listId: string,
  customSource: string
): Promise<void> {
  const res = await fetch(`${BASE}/profile-subscription-bulk-create-jobs/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: customSource,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: "SUBSCRIBED" } },
                  },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: listId } } },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Klaviyo subscribe failed: ${res.status} ${detail}`);
  }
}

export async function trackEvent(params: {
  email: string;
  metric: string;
  properties?: Record<string, unknown>;
  value?: number;
  uniqueId?: string;
  time?: string;
}): Promise<void> {
  const { email, metric, properties, value, uniqueId, time } = params;

  const res = await fetch(`${BASE}/events/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: properties ?? {},
          ...(value !== undefined && { value }),
          ...(uniqueId && { unique_id: uniqueId }),
          ...(time && { time }),
          metric: {
            data: { type: "metric", attributes: { name: metric } },
          },
          profile: {
            data: { type: "profile", attributes: { email } },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Klaviyo event failed: ${res.status} ${detail}`);
  }
}
