import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // CRON Security Verification
    // If you explicitly wire this up in Vercel Cron, you must check the secret natively.
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // In development, or if the secret isn't set, we gently allow it just for tests.
      // But in Production, we block unauthorized cron hits rigidly.
      if (process.env.NODE_ENV === "production" && process.env.CRON_SECRET) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    // Identify the chronological cutoff (30 Days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Natively purge all local user accounts that never reached verified status
    // within a 30-day chronological buffer.
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        emailVerified: false,
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Automatically purged ${deletedUsers.count} unverified abandoned accounts.`,
    });
  } catch (error: any) {
    console.error("[CRON] Cleanup Failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
