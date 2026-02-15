import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/authorize';
import { Role } from '@/lib/auth/roles';

// POST /api/teachers
// Protected: ADMIN only
export async function POST(req: NextRequest) {
  // 1. Authorize: Check if user is an ADMIN
  const { user, error } = await requireRole([Role.ADMIN]);
  
  // 2. Fail secure: Return error if unauthorized
  if (error) return error;

  // 3. Business Logic: Mock creating a teacher
  // In a real app, you would validate body and insert into DB
  try {
    const body = await req.json();
    
    // Simulate DB operation
    console.log(`[ADMIN user.id=${user.id}] Creating teacher request`);

    return NextResponse.json(
      { message: 'Teacher created successfully', createdBy: user.id },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
