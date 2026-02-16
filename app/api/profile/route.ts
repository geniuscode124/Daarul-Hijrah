import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/authorize';
import { Role } from '@/lib/auth/roles';

// GET /api/profile
// Protected: Any Authenticated User (STUDENT, TEACHER, ADMIN)
export async function GET(req: NextRequest) {
  // 1. Authorize: Allow any role
  const { user, error } = await requireRole([Role.STUDENT, Role.TEACHER, Role.ADMIN]);
  
  if (error) return error;

  // 2. Business Logic: Return full user profile
  return NextResponse.json({
    profile: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      joinedAt: user.createdAt,
    }
  }, { status: 200 });
}
