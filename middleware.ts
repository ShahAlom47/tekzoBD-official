import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname.toLowerCase();
    const token = req.nextauth.token;
    const role = token?.role;

    const publicRoutes = ["/", "/login", "/register", "/about", "/portfolio"];
    const publicApiRoutes = ["/api/public-data", "/api/blogs"];

    const adminApiRoutes = [
      "/api/orders/allOrders",
      "/api/portfolio/updatePortfolio",
    ];

    const res = NextResponse.next();

    // 🌐 Add CORS headers
    res.headers.set("Access-Control-Allow-Origin", "http://localhost:3001"); 
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 🔄 Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: res.headers });
    }

    // ✅ Allow public pages & API without auth
    if (
      publicRoutes.includes(pathname) ||
      publicApiRoutes.includes(pathname) ||
      pathname.startsWith("/api/auth")
    ) {
      return res;
    }

    // ❌ No token = unauthenticated → redirect to login
    if (!token) {
      const redirectTo = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(new URL(`/login?redirect=${redirectTo}`, req.url));
    }

    // ✅ Admin-only routes
    if (pathname.startsWith("/dashboard/admin") && role === "admin") {
      return res;
    }

    if (adminApiRoutes.includes(pathname) && role === "admin") {
      return res;
    }

    if (pathname.startsWith("/user") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ User-only routes
    if (
      (pathname.startsWith("/dashboard/user") ||
        pathname.startsWith("/api/user") ||
        pathname.startsWith("/user")) &&
      (role === "user" || role === "admin")
    ) {
      return res;
    }

    // ✅ Common dashboard access for admin & user
    if (pathname === "/dashboard" && (role === "admin" || role === "user")) {
      return res;
    }

    // ❌ Unauthorized fallback
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname.toLowerCase();

        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/about",
          "/portfolio",
        ];
        const publicApiRoutes = ["/api/public-data", "/api/blogs"];

        // ✅ Allow public access without token
        if (
          publicRoutes.includes(path) ||
          publicApiRoutes.includes(path) ||
          path.startsWith("/api/auth")
        ) {
          return true;
        }

        // ✅ Allow private access only if token exists
        return !!token;
      },
    },
  }
);

// ✅ Middleware active on dashboard and API routes
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/user/:path*"],
};
