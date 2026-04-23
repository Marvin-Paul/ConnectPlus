import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("[API] /api/me error:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      details: error.message || String(error),
      code: error.code
    }, { status: 500 });
  }
}
