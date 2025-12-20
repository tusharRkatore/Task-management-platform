import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Task, TaskFilterDTO } from "@/lib/types/task"
import type { CreateTaskDTO } from "@/lib/validation/task.schemas"

class TaskRepository {
  async findAll(filters?: TaskFilterDTO): Promise<Task[]> {
    const supabase = await createServerSupabaseClient()

    let query = supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })

    if (filters?.status) query = query.eq("status", filters.status)
    if (filters?.priority) query = query.eq("priority", filters.priority)
    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      )
    }

    const { data, error } = await query
    if (error) throw error
    return data ?? []
  }

  async findById(id: string): Promise<Task | null> {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  async create(dto: CreateTaskDTO, creatorId: string): Promise<Task> {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...dto, creator_id: creatorId })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async update(id: string, dto: Partial<CreateTaskDTO>): Promise<Task> {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("tasks")
      .update(dto)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async delete(id: string): Promise<void> {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.from("tasks").delete().eq("id", id)
    if (error) throw error
  }

  async getStats() {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.from("tasks").select("*")
    return { totalTasks: data?.length ?? 0 }
  }
}

export default new TaskRepository()
