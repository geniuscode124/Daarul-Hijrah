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
    
    // Extract sanitized metadata for logging (avoiding PII and raw body)
    const { filename, size, contentType } = body || {};
    const logMetadata = {
      filename: typeof filename === 'string' ? filename : undefined,
      size: typeof size === 'number' ? size : undefined,
      contentType: typeof contentType === 'string' ? contentType : undefined,
    };

    console.log(`[${user.role} ${user.id}] Uploading material:`, logMetadata);

    return NextResponse.json(
      { message: 'Material uploaded successfully', uploadedBy: user.id, role: user.role },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
