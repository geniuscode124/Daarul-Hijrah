import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        await resend.emails.send({
          from: "Daarul-Hijrah <onboarding@resend.dev>", // Requires domain verification later
          to: user.email,
          subject: "Reset your password for Daarul-Hijrah",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F4F9F6; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                .header { background-color: #0F3D2E; padding: 30px 20px; text-align: center; border-bottom: 3px solid #C5A059; }
                .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px; }
                .content { padding: 40px 30px; text-align: center; color: #333333; }
                .content p { font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #4b5563; }
                .btn { display: inline-block; background-color: #C5A059; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .footer { padding: 20px; text-align: center; font-size: 13px; color: #888888; background-color: #f9f9f9; border-top: 1px solid #eeeeee; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Daarul-Hijrah</h1>
                </div>
                <div class="content">
                  <h2 style="margin-top: 0; color: #0F3D2E; font-size: 22px;">Password Reset Request</h2>
                  <p>We received a request to reset your password. Click the button below to securely set a new password for your account.</p>
                  <a href="${url}" class="btn">Reset My Password</a>
                  <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} Daarul-Hijrah. All rights reserved.<br>
                  <span style="font-size: 11px; margin-top: 10px; display: block; word-break: break-all;">If the button doesn't work, copy and paste this link: <br>${url}</span>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        // console.log(`[Dev Logs] Reset password email actively sent to ${user.email} with URL: ${url}`);
        console.log(`[Auth] Reset password email sent to ${user.email}`);
      } catch (error) {
        console.error("Failed to send reset email:", error);
        throw error;
      }
    },
  },
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      passwordHash: { type: "string" },
      role: { type: "string", defaultValue: "STUDENT" },
      status: { type: "string", defaultValue: "ACTIVE" },
    }
  },
  trustedOrigins(request) {
    return [
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "http://192.168.1.*:3000"
    ];
  },
});
