import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ✅ Silent guard
  if (!supabaseUrl || !supabaseAnonKey) {
    return res
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,      // 🔒 CRITICAL
        autoRefreshToken: false,    // 🔒 CRITICAL
        detectSessionInUrl: false,  // 🔒 CRITICAL
      },
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: () => {
          // 🔒 BLOCK refresh-token writes completely
        },
      },
    }
  )

  // ✅ Protect dashboard routes
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return res
}
