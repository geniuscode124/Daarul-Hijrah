import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    return window.location.origin;
  }

  // 1. Explicit app URL (best for consistency, OAuth, etc.)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 2. Vercel fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Local dev fallback
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(), // Dynamically resolve base URL for both server-side and client-side contexts.
});
