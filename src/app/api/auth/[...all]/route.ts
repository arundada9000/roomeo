import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { checkRateLimit } from "@/lib/rate-limiter";

const { GET: _GET, POST: _POST } = toNextJsHandler(auth);

async function rateLimitWrapper(
  request: Request,
  handler: (req: Request) => Promise<Response>,
) {
  const url = new URL(request.url);
  const path = url.pathname;

  const isSignUp = path.endsWith("/sign-up/email");
  const isSignIn = path.endsWith("/sign-in/email");

  if (isSignUp || isSignIn) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const prefix = isSignUp ? "signup" : "signin";
    const { allowed } = await checkRateLimit(`${prefix}:${ip}`, {
      maxRequests: isSignUp ? 5 : 10,
      windowMs: 15 * 60 * 1000,
    });
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: "Too many attempts. Please try again later.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  return handler(request);
}

export const GET = (req: Request) => rateLimitWrapper(req, _GET);
export const POST = (req: Request) => rateLimitWrapper(req, _POST);
