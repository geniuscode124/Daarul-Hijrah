import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/authorize';
import { Role } from '@/lib/auth/roles';

// POST /api/materials
// Protected: ADMIN and TEACHER
export async function POST(req: NextRequest) {
  // 1. Authorize: Check if user is ADMIN or TEACHER
  const { user, error } = await requireRole([Role.ADMIN, Role.TEACHER]);
  
  if (error) return error;

  // 2. Business Logic
  try {
    const body = await req.json();
    // console.log(`[${user.role} ${user.email}] Uploading material:`, body);
    console.log(`[${user.role} userId:${user.id}] Uploading material for:`, body?.title ?? 'unknown');

    return NextResponse.json(
      { message: 'Material uploaded successfully', uploadedBy: user.id, role: user.role },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
