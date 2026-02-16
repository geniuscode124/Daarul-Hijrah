import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { SignupSchema } from '@/lib/auth/validations';
import { createSession } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    // Check if body is present
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 415 });
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ message: 'Invalid or empty JSON body' }, { status: 400 });
    }
    
    // Validate input
    const result = SignupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: z.flattenError(result.error).fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password } = result.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user (Role always defaults to "student")
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role: 'STUDENT', 
      },
    });

    // Create session (login immediately after signup)
    await createSession(newUser.id);

    return NextResponse.json(
      { message: 'Account created successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role } },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
