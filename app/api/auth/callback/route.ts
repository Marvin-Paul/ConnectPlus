import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken, setAuthCookie } from '@/lib/auth';

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          },
        },
      }
    );
    const { data: { user: authUser }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (authUser && !error) {
       // Sync with Prisma
       let user = await prisma.user.findUnique({
         where: { id: authUser.id }
       });

        if (!user) {
          const fullName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || "User";
          const [firstName, ...lastNameParts] = fullName.split(' ');
          const lastName = lastNameParts.join(' ');

          user = await prisma.user.create({
            data: {
              id: authUser.id,
              email: authUser.email!,
              name: fullName,
              firstName: firstName || fullName,
              lastName: lastName || "",
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
