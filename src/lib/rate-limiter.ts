const store = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULTS: Record<string, RateLimitConfig> = {
  contact: { maxRequests: 3, windowMs: 60 * 1000 },
  newsletter: { maxRequests: 3, windowMs: 60 * 1000 },
  signup: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  signin: { maxRequests: 10, windowMs: 15 * 60 * 1000 },
  adminAction: { maxRequests: 30, windowMs: 60 * 1000 },
};

export async function checkRateLimit(
  key: string,
  config?: RateLimitConfig,
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const cfg = config || DEFAULTS.contact;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + cfg.windowMs });
    return { allowed: true, remaining: cfg.maxRequests - 1, resetIn: cfg.windowMs };
  }

  if (entry.count >= cfg.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: cfg.maxRequests - entry.count, resetIn: entry.resetAt - now };
}

export function getRateLimitKey(headers: Headers, prefix: string): string {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || headers.get("x-real-ip")
    || "unknown";
  return `${prefix}:${ip}`;
}

// Clean up old entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now >= entry.resetAt) store.delete(key);
    }
  }, 60_000);
}
