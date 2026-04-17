import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseURL = () => {
  // Client-side: use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Server-side: check for explicitly configured URL first
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // On Vercel: use VERCEL_URL with https protocol
  if (process.env.VERCEL_URL) {
    // VERCEL_URL doesn't include protocol, so add https://
    return `https://${process.env.VERCEL_URL}`;
  }

  // Development fallback
  const baseURL = 'http://localhost:3000';

  // Warn if in production without proper configuration
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[Auth Configuration] NEXT_PUBLIC_APP_URL is not set. OAuth redirects may fail in production. ' +
        'Please set NEXT_PUBLIC_APP_URL to your production domain (e.g., https://yourdomain.com)',
    );
  }

  return baseURL;
};
