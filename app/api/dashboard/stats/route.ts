import { createServerClient } from "@/lib/supabase/server"

export class TaskService {
  /**
   * Get dashboard statistics for a specific user
   */
  static async getDashboardStats(userId: string) {
    const supabase = await createServerClient()

    // 1️⃣ Total tasks
    const { count: totalTasks, error: totalError } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)

    if (totalError) throw totalError

    // 2️⃣ Completed tasks
    const { count: completedTasks, error: completedError } =
      await supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("status", "completed")

    if (completedError) throw completedError

    // 3️⃣ Pending tasks
    const pendingTasks = (totalTasks || 0) - (completedTasks || 0)

    return {
      totalTasks: totalTasks || 0,
      completedTasks: completedTasks || 0,
      pendingTasks,
    }
  }
}
