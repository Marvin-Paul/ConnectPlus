import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("[API] GET /api/me error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return NextResponse.json({ message: "Internal server error", details: error.message }, { status: 500 });
  }
}
