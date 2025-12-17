import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function proxy(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_ENVSUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_ENVSUPABASE_ANON_KEY

  // ✅ SILENT GUARD (no logging)
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get("cookie")
        if (!cookieHeader) return []

        return cookieHeader.split("; ").map((c) => {
          const [name, ...rest] = c.split("=")
          return { name, value: rest.join("=") }
        })
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  return response
}
