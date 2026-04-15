import { intlayerProxy } from "next-intlayer/proxy";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Log the request to verify proxy execution in Vercel/Local logs
  console.log('Proxy handling request:', request.nextUrl.pathname);
  
  return intlayerProxy(request);
}

// Next.js 16 often expects the proxy/middleware to be a default export
export default proxy;

export const config = {
  matcher:
    "/((?!api|_next|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_vercel).*)",
};
