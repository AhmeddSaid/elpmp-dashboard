import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const isDevelopment: boolean = process.env.NODE_ENV === "development";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const nonce: string = nanoid();
  const cspHeader: string = `
    default-src 'self';
    script-src 'self' ${isDevelopment ? "'unsafe-eval'" : ""} 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
  const contentSecurityPolicyHeaderValue: string = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders: Headers = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,POST,PUT,OPTIONS"
  );
  response.headers.set(
    "Cache-Control",
    "max-age=0, max-stale=0, must-revalidate, no-cache, no-store, post-check=0, pre-check=0, private"
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Download-Options", "noopen");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  const token: string | boolean =
    request.cookies.get("pmp_db_userId")?.value || false;
  const isAuthRoute: boolean =
    request.nextUrl.pathname.startsWith("/auth/login");

  if (isAuthRoute && token)
    return NextResponse.redirect(new URL("/", request.url));
  if (!isAuthRoute && !token) {
    const url = new URL("/auth/login", request.url);
    return NextResponse.redirect(url.toString());
  }

  return response;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
