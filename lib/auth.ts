import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const auth = betterAuth({
  database: prismaAdapter(prisma as any, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        return bcrypt.hash(password, 10);
      },
      verify: async ({ password, hash }) => {
        return bcrypt.compare(password, hash);
      },
    },
  },
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      passwordHash: { type: "string" },
      role: { type: "string", defaultValue: "STUDENT" },
      status: { type: "string", defaultValue: "active" },
    }
  }
});
