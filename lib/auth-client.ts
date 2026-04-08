import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
    if (typeof window !== "undefined") return window.location.origin;
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL() // Dynamically resolve base URL to support both Server and Client via local IP addresses.
});
