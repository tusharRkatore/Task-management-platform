// API Route Handler for tasks collection
import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/lib/services/task.service"
import { createServerClient } from "@/lib/supabase/server"
import { createTaskSchema } from "@/lib/validation/task.schemas"
import { ZodError } from "zod"

/**
 * GET /api/tasks
 * Fetch all tasks with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status") as any,
      priority: searchParams.get("priority") as any,
      search: searchParams.get("search") || undefined,
      assigned_to_me: searchParams.get("assigned_to_me") === "true",
      created_by_me: searchParams.get("created_by_me") === "true",
      overdue: searchParams.get("overdue") === "true",
    }

    const tasks = await TaskService.getAllTasks(filters)
    return NextResponse.json(tasks, { status: 200 })
  } catch (error) {
    console.error("[API] GET /api/tasks error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/tasks
 * Create a new task
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate with Zod
    const validatedData = createTaskSchema.parse(body)

    const task = await TaskService.createTask(validatedData, user.id)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("[API] POST /api/tasks error:", error)

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
