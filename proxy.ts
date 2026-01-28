import { NextRequest, NextResponse } from 'next/server';

// Define protected route patterns
const protectedRoutes = ['/student', '/teacher', '/admin'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  
  // Check for session_id cookie
  const sessionId = req.cookies.get('session_id')?.value;

  // 1. Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !sessionId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect authenticated users away from Auth pages (login/signup) if session exists
  // Note: We cannot check role here without database access in Edge Runtime.
  // Ideally, redirect to a loading page or root where Server Component handles routing.
  if ((path === '/login' || path === '/signup') && sessionId) {
      // For now, redirect to home or a generic dashboard gateway
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
