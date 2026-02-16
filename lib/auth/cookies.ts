import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'session_id';

import { signToken, verifyToken } from './token';

export async function setSessionCookie(sessionId: string, expiresAt: Date) {
  const cookieStore = await cookies();
  const signedSessionId = await signToken(sessionId);
  
  cookieStore.set(SESSION_COOKIE_NAME, signedSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const signedValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!signedValue) return undefined;
  
  const verifiedId = await verifyToken(signedValue);
  return verifiedId ?? undefined;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
