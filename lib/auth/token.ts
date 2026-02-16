export const SESSION_SECRET = process.env.SESSION_SECRET || 'default-dev-secret-do-not-use-in-prod';

if (process.env.NODE_ENV === 'production' && SESSION_SECRET === 'default-dev-secret-do-not-use-in-prod') {
  console.warn('WARNING: Using default session secret in production. Set SESSION_SECRET environment variable.');
}

async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SESSION_SECRET);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signToken(data: string): Promise<string> {
  const key = await getKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );
  
  // Convert signature to base64url for safe cookie storage
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    
  return `${data}.${signatureBase64}`;
}

export async function verifyToken(token: string): Promise<string | null> {
  const parts = token.split('.');
  // Expect format: data.signature
  if (parts.length !== 2) return null;
  
  const [data, signatureBase64] = parts;
  
  // Compare signatures
  // We need to decode the provided signatureBase64 back to bytes for comparison?
  // Easier: re-encode our computed signature to base64url and compare strings (timing attack risk?).
  // For HMAC verification, we should preferably use crypto.subtle.verify to avoid timing attacks.
  
  const key = await getKey();
  const encoder = new TextEncoder();
  
  // Convert base64url signature back to ArrayBuffer
  const signatureStr = atob(signatureBase64.replace(/-/g, '+').replace(/_/g, '/'));
  const signatureBytes = new Uint8Array(signatureStr.length);
  for (let i = 0; i < signatureStr.length; i++) {
    signatureBytes[i] = signatureStr.charCodeAt(i);
  }
  
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(data)
  );
  
  return isValid ? data : null;
}
