import { prisma } from '@/lib/prisma';
import { setSessionCookie, getSessionCookie, deleteSessionCookie } from './cookies';

import { cache } from 'react';

// Using Lucia's utility or standard crypto for ID generation if Lucia isn't installed. 
// Since Lucia isn't explicitly mentioned as installed, I'll use crypto.randomUUID or a simple random string.
// However, the user said "No third-party auth services (no Clerk, no Auth0, no Firebase)."
// But using a library like 'oslo' or 'lucia' for utilities might be fine. 
// To keep it dependency-minimal as requested ("No third-party auth services"), I'll use crypto.
import { randomBytes } from 'crypto';

function generateSessionId(): string {
  return randomBytes(32).toString('hex');
}

export async function createSession(userId: string) {
  const sessionId = generateSessionId();
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  });
  
  await setSessionCookie(session.id, session.expiresAt);
  return session;
}

export const getSession = cache(async () => {
  const sessionId = await getSessionCookie();
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  // Check expiration
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    await deleteSessionCookie();
    return null;
  }

  // Optional: Extend session if close to expiry (sliding window) - keeping it simple for now as requested.

  return session.user;
});

export async function deleteSession() {
  const sessionId = await getSessionCookie();
  if (sessionId) {
    try {
      await prisma.session.delete({ where: { id: sessionId } });
    } catch (error) {
      // Ignore if already deleted
    }
  }
  await deleteSessionCookie();
}

