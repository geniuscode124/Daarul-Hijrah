# Google Sign-In Implementation Guide

## Overview

This document explains the Google OAuth integration for your Daarul-Hijrah app using Better Auth.

## What Was Implemented

### 1. **Backend Configuration** (`lib/auth.ts`)

- Moved Google OAuth from nested `emailAndPassword.socialProviders` to root-level `socialProviders`
- Configured Google OAuth with credentials from environment variables
- Better Auth automatically handles OAuth token management and user creation

### 2. **Frontend Implementation**

- **LoginForm**: Added Google sign-in button with proper loading states and error handling
- **SignupForm**: Added Google sign-up button that creates account on first login
- Both use `authClient.signIn.social()` method

### 3. **OAuth Callback Handler** (`app/api/auth/callback/google/route.ts`)

- Handles Google's OAuth callback and token exchange
- Automatically managed by Better Auth

### 4. **Database Schema** (Already in place)

- `Account` model stores OAuth provider data (tokens, provider ID, etc.)
- `User` model links to multiple accounts via one-to-many relationship
- Supports account linking for users with multiple auth methods

---

## Environment Setup Required

Create a `.env.local` file in your project root with:

```env
# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# Better Auth Base URL
AUTH_URL=http://localhost:3000  # Development
# AUTH_URL=https://yourdomain.com  # Production
```

### Getting Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Create a new project (or select existing)

2. **Enable OAuth 2.0**
   - Search for "OAuth 2.0" in APIs
   - Click "Create Credentials"
   - Choose "OAuth client ID"
   - Application type: "Web application"

3. **Configure Authorized URLs**
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs:** (Critical!)
     - `http://localhost:3000/api/auth/google` (development)
     - `http://localhost:3000/api/auth/callback` (also supported)
     - `https://yourdomain.com/api/auth/google` (production)

4. **Copy credentials**
   - Client ID → `GOOGLE_CLIENT_ID`
   - Client Secret → `GOOGLE_CLIENT_SECRET`

---

## How It Works

### Sign-In Flow

```
User clicks "Google" button
         ↓
Click handler calls authClient.signIn.social({ provider: 'google' })
         ↓
Redirects to Google login page
         ↓
User authenticates with Google
         ↓
Google redirects back to /api/auth/google
         ↓
Better Auth exchanges authorization code for tokens
         ↓
Better Auth creates/updates user account in database
         ↓
User is authenticated and redirected to callbackURL (/)
```

### User Creation

- **On first Google sign-in**: Create new User account with email and name from Google
- **On subsequent sign-in**: Load existing User and Account
- **Account linking**: Users can sign in with both email/password and Google

---

## Security Best Practices Implemented

### 1. **OAuth 2.0 Security**

- ✅ Authorization code flow (never expose token in URL)
- ✅ State parameter (CSRF protection) - handled by Better Auth
- ✅ PKCE flow for additional security - handled by Better Auth
- ✅ Token stored securely in database, never in client-side storage

### 2. **Secrets Management**

- ✅ OAuth secret stored in environment variables only
- ✅ Never hardcode credentials in source code
- ✅ Use `.env.local` (which is `.gitignored`)

### 3. **User Data Safety**

- ✅ Passwords never stored for OAuth users
- ✅ Email verified by Google OAuth provider
- ✅ User email made unique in database
- ✅ Account links require user ID and provider ID verification

### 4. **Redirect Security**

- ✅ Explicit `callbackURL` prevents open redirect attacks
- ✅ Middleware can validate redirect destinations (optional)
- ✅ `trustedOrigins` configured in auth to prevent CSRF

### 5. **Session Management**

- ✅ HTTP-only cookies (set by Better Auth)
- ✅ Secure flag enabled in production
- ✅ SameSite policy prevents CSRF
- ✅ Sessions validated server-side

---

## Common Issues & Troubleshooting

### Issue: "Redirect URI mismatch"

**Cause**: The URL in Google Console doesn't match your actual redirect URL

**Solution**:

```
Add to Google Cloud Console Authorized Redirect URIs:
- http://localhost:3000/api/auth/google
- http://localhost:3000/api/auth/callback/google
```

### Issue: Empty `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET`

**Cause**: Environment variables not set

**Solution**:

```bash
# Verify your .env.local has:
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET
# If empty, copy from Google Cloud Console again
```

### Issue: User's email not populated after Google sign-in

**Cause**: Google didn't return email in token claims

**Solution**:

- Make sure "email" scope is requested (Better Auth does this automatically)
- Check `logger.debug()` in Better Auth for token details

### Issue: Same user created twice instead of updating existing

**Cause**: Email addresses don't match exactly (case sensitivity)

**Solution**: Better Auth handles this with `.toLowerCase()` on email, but verify in database logs

---

## Advanced: Account Linking

Users can authenticate with both email/password AND Google:

```typescript
// User signs up with email
await authClient.signUp.email({ email, password, ... })

// Later, user clicks Google button
// Better Auth automatically links to existing account
await authClient.signIn.social({ provider: 'google' })
```

The `Account` model links both auth methods to the same User.

---

## Testing OAuth Locally

### Set Up ngrok for HTTPS Testing

```bash
# Google requires HTTPS for OAuth in production
# For localhost testing with HTTPS:
npm install -g ngrok

# In one terminal:
ngrok http 3000

# Get HTTPS URL and add to Google Console:
# https://your-random-id.ngrok.io/api/auth/google
```

---

## Production Checklist

- [ ] Google Client ID and Secret in production environment variables
- [ ] Authorized redirect URIs include production domain
- [ ] `AUTH_URL` set to production domain (https://)
- [ ] HTTPS enabled on production (required by OAuth)
- [ ] Cookie security settings enabled (`secure`, `httpOnly`, `sameSite`)
- [ ] CORS configured if frontend is on different domain
- [ ] Error monitoring enabled (Sentry, etc.) for OAuth failures

---

## Files Modified

| File                                    | Changes                                      |
| --------------------------------------- | -------------------------------------------- |
| `lib/auth.ts`                           | Moved `socialProviders.google` to root level |
| `lib/auth-client.ts`                    | Added plugins array (for future extensions)  |
| `components/forms/LoginForm.tsx`        | Added Google sign-in handler and UI          |
| `components/forms/SignupForm.tsx`       | Added Google sign-up handler and UI          |
| `app/api/auth/callback/google/route.ts` | Created OAuth callback handler               |

---

## References

- [Better Auth Documentation](https://www.better-auth.com)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
