import { hash, compare } from 'bcryptjs';

export async function hashPassword(plainText: string): Promise<string> {
  // Use 12 salt rounds for a good balance of security and performance
  return await hash(plainText, 12);
}

export async function verifyPassword(plainText: string, hashed: string): Promise<boolean> {
  return await compare(plainText, hashed);
}
