// Durable mapping of Square order_id → buyer email, backed by Upstash Redis.
// Set when we create a payment link, read when the Square webhook fires.

import { Redis } from "@upstash/redis";

const TTL_SECONDS = 24 * 60 * 60; // 24h
const KEY_PREFIX = "square:order:";

let _redis: Redis | null = null;
function redis(): Redis {
  if (!_redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Upstash Redis not configured — set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN"
      );
    }
    _redis = new Redis({ url, token });
  }
  return _redis;
}

type Entry = { email: string; name?: string };

export async function rememberOrderEmail(
  orderId: string,
  email: string,
  name?: string
): Promise<void> {
  const entry: Entry = { email, ...(name && { name }) };
  await redis().set(KEY_PREFIX + orderId, entry, { ex: TTL_SECONDS });
}

export async function lookupOrderEmail(
  orderId: string
): Promise<Entry | undefined> {
  const entry = await redis().get<Entry>(KEY_PREFIX + orderId);
  return entry ?? undefined;
}
