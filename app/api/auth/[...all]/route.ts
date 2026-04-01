import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  console.log("AUTH GET HIT");
  return auth.handler(request);
}

export async function POST(request: Request) {
  console.log("AUTH POST HIT");
  return auth.handler(request);
}