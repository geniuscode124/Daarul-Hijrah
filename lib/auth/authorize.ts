import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { Role } from '@/lib/auth/roles';

type AuthResult = 
  | { user: NonNullable<Awaited<ReturnType<typeof getSession>>>; error: null }
  | { user: null; error: NextResponse };

/**
 * Authorization guard to ensure the user is authenticated and has the required role.
 * 
 * @param allowedRoles Array of roles allowed to access the resource.
 * @returns An object containing the user (if authorized) or an error response (if unauthorized).
 */
export async function requireRole(allowedRoles: Role[]): Promise<AuthResult> {
  const user = await getSession();

  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    };
  }

  // Check if user has any of the required roles
  const hasRole = user.roles.some((userRole: string) => allowedRoles.includes(userRole as Role));

  if (!hasRole) {
    return {
      user: null,
      error: NextResponse.json({ message: 'Forbidden: Insufficient permissions' }, { status: 403 }),
    };
  }

  return { user, error: null };
}
