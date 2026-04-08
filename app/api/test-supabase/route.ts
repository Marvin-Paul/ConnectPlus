import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // 1. Test basic connectivity by fetching the public "Post" table count
    const { count, error: dbError } = await supabase
      .from('Post')
      .select('*', { count: 'exact', head: true });

    // 2. Test Auth Service discovery
    const { data: authData, error: authError } = await supabase.auth.getSession();

    return NextResponse.json({
      status: (!dbError && !authError) ? "SUCCESS" : "PARTIAL_FAILURE",
      configuration: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        keyType: "ANON_KEY",
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/['"]/g, '').length,
      },
      diagnostics: {
        database: {
          connected: !dbError,
          error: dbError?.message || null,
          postCount: count || 0
        },
        auth: {
          connected: !authError,
          error: authError?.message || null,
          sessionActive: !!authData?.session
        }
      },
      environment: {
        timestamp: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (err: any) {
    return NextResponse.json({ 
      status: "CRITICAL_ERROR", 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}
