import { NextRequest, NextResponse } from 'next/server';

// Define protected route patterns
const protectedRoutes = ['/student', '/teacher', '/admin'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  
  // Check for better-auth session token
  const sessionId = req.cookies.get('better-auth.session_token')?.value;

  // Debug logging
  console.log(`[Middleware Proxy] Path: ${path} | Authenticated: ${!!sessionId}`);

  // 1. Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !sessionId) {
    console.log(`[Middleware Proxy] Redirecting to /login (Unauthenticated trying to access protected)`);
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect authenticated users away from Auth pages (login/signup) if session exists
  if ((path === '/login' || path === '/signup') && sessionId) {
      console.log(`[Middleware Proxy] Redirecting to / (Authenticated user trying to access Auth page)`);
      return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Note: Strict RBAC (Role-Based Access Control) must now happen in Server Components (Layout/Page)
  // because we cannot access the database to verify the session & role in Edge Middleware.

  return NextResponse.next();
}

// Configure which routes middleware applies to
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
