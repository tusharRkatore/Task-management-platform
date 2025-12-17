import DashboardClient from "@/components/dashboard-client"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  // ✅ MUST await (because server client is async in Next.js 16)
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false })

  return <DashboardClient initialTasks={tasks ?? []} user={user} />
}
