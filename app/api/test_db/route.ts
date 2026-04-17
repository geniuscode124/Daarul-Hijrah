import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { success: false, error: 'Not found' },
      { status: 404 },
    );
  }

  try {
    const count = await prisma.user.count();
    return NextResponse.json({
      success: true,
      message: 'Database connected',
      userCount: count,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database test failed:', error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
