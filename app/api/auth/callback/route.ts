import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user: authUser }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (authUser && !error) {
       // Sync with Prisma
       let user = await prisma.user.findUnique({
         where: { id: authUser.id }
       });

       if (!user) {
          user = await prisma.user.create({
            data: {
              id: authUser.id,
              email: authUser.email!,
              name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || "User",
              phone: authUser.phone || authUser.user_metadata?.phone || "",
              passwordHash: 'AUTH_MANAGED_BY_SUPABASE',
              username: authUser.email?.split("@")[0].toLowerCase() + "_" + Math.floor(Math.random() * 1000),
              verified: true
            }
          });
       }

       // Set local auth cookie
       const token = generateToken({ userId: user.id, email: user.email });
       await setAuthCookie(token);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
