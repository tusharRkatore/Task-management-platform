import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null = null

/**
 * Supabase client for CLIENT COMPONENTS only
 */
export function createClient(): SupabaseClient | null {
  // ✅ Reuse singleton
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "❌ Supabase client env vars missing.\n" +
        "➡ Required:\n" +
        "   NEXT_PUBLIC_SUPABASE_URL\n" +
        "   NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
        "➡ Restart dev server after updating .env.local"
    )
    return null
  }

  supabaseClient = createSupabaseClient(
    supabaseUrl,
    supabaseAnonKey
  )

  return supabaseClient
}
