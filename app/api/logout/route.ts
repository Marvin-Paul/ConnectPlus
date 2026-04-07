import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST() {
  await removeAuthCookie();
  await supabase.auth.signOut();
  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
