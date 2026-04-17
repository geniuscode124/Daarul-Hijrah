import { auth } from '@/lib/auth';

/**
 * OAuth callback handler for Google authentication
 * Better Auth automatically handles the OAuth flow and redirects here
 */
export const GET = auth.handler;
