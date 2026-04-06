import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Auth user fetch error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
