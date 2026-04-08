import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: authData, error: authError } = await supabase.auth.getSession();
  return NextResponse.json({
    status: authError ? 'ERROR' : 'OK',
    error: authError?.message,
    keyStart: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().substring(0, 15),
    keyEnd: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().slice(-15),
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  });
}
