import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth/session';

// Define protected route patterns
const protectedRoutes = ['/student', '/teacher', '/admin'];
const publicRoutes = ['/login', '/signup', '/', '/about', '/contact'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  
  // Decrypt session from cookie
  const cookie = req.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // 1. Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect authenticated users away from Auth pages (login/signup)
  if (path === '/login' || path === '/signup') {
    if (session?.userId) {
        // Redirect to their dashboard based on role
        return NextResponse.redirect(new URL(`/${session.role}/dashboard`, req.nextUrl));
    }
  }

  // 3. Role-Based Access Control
  if (path.startsWith('/admin') && session?.role !== 'admin') {
     return NextResponse.redirect(new URL('/unauthorized', req.nextUrl));
  }
  
  if (path.startsWith('/teacher') && session?.role !== 'teacher') {
     return NextResponse.redirect(new URL('/unauthorized', req.nextUrl));
  }

  return NextResponse.next();
}

// Configure which routes middleware applies to
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
