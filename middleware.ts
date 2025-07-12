import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req) {
    // Add any additional middleware logic here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all routes except public ones
        const publicPaths = [
          "/",
          "/login",
          "/signup",
          "/api/auth",
          "/favicon.ico",
          "/_next",
          "/images",
          "/public",
        ];

        const path = req.nextUrl.pathname;

        // Allow public paths
        if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
          return true;
        }

        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};