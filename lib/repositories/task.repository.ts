/**
 * Task Repository
 * Data access layer for task-related database operations
 * Follows Repository pattern for separation of concerns
 */
import { createServerClient } from "@/lib/supabase/server"
import type { Task, TaskFilterDTO } from "@/lib/types/task"
import type { CreateTaskDTO, UpdateTaskDTO } from "@/lib/validation/task.schemas"

export class TaskRepository {
  /**
   * Get all tasks for the current user with optional filtering
   * Applies RLS policies automatically via Supabase
   */
  static async findAll(filters?: TaskFilterDTO): Promise<Task[]> {
    const supabase = await createServerClient()

    let query = supabase
      .from("tasks")
      .select(`
        *,
        creator:users!tasks_creator_id_fkey(id, name, email),
        assigned_to:users!tasks_assigned_to_id_fkey(id, name, email)
      `)
      .order("created_at", { ascending: false })

    // Apply filters
    if (filters?.status) {
      query = query.eq("status", filters.status)
    }
    if (filters?.priority) {
      query = query.eq("priority", filters.priority)
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }
    if (filters?.assigned_to_me) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) query = query.eq("assigned_to_id", user.id)
    }
    if (filters?.created_by_me) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) query = query.eq("creator_id", user.id)
    }
    if (filters?.overdue) {
      query = query.lt("due_date", new Date().toISOString()).neq("status", "Completed")
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Get a single task by ID
   */
  static async findById(id: string): Promise<Task | null> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("tasks")
      .select(`
        *,
        creator:users!tasks_creator_id_fkey(id, name, email),
        assigned_to:users!tasks_assigned_to_id_fkey(id, name, email)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Create a new task
   */
  static async create(dto: CreateTaskDTO, creatorId: string): Promise<Task> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        ...dto,
        creator_id: creatorId,
      })
      .select(`
        *,
        creator:users!tasks_creator_id_fkey(id, name, email),
        assigned_to:users!tasks_assigned_to_id_fkey(id, name, email)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Update an existing task
   */
  static async update(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("tasks")
      .update(dto)
      .eq("id", id)
      .select(`
        *,
        creator:users!tasks_creator_id_fkey(id, name, email),
        assigned_to:users!tasks_assigned_to_id_fkey(id, name, email)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Delete a task
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createServerClient()

    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) throw error
  }

  /**
   * Get dashboard statistics
   */
  static async getStats(): Promise<any> {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .or(`creator_id.eq.${user.id},assigned_to_id.eq.${user.id}`)

    if (!tasks)
      return {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        overdueTasks: 0,
        assignedToMe: 0,
        createdByMe: 0,
      }

    const now = new Date()

    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.status === "Completed").length,
      inProgressTasks: tasks.filter((t) => t.status === "In Progress").length,
      overdueTasks: tasks.filter((t) => t.due_date && new Date(t.due_date) < now && t.status !== "Completed").length,
      assignedToMe: tasks.filter((t) => t.assigned_to_id === user.id).length,
      createdByMe: tasks.filter((t) => t.creator_id === user.id).length,
    }
  }
}
