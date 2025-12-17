// API Route Handler for individual tasks
import { type NextRequest, NextResponse } from "next/server"
import { TaskService } from "@/lib/services/task.service"
import { createServerClient } from "@/lib/supabase/server"
import { updateTaskSchema } from "@/lib/validation/task.schemas"
import { ZodError } from "zod"

/**
 * GET /api/tasks/[id]
 * Fetch a single task by ID
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const task = await TaskService.getTaskById(id)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task, { status: 200 })
  } catch (error) {
    console.error("[API] GET /api/tasks/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * PATCH /api/tasks/[id]
 * Update a task
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    // Validate with Zod
    const validatedData = updateTaskSchema.parse(body)

    const task = await TaskService.updateTask(id, validatedData)
    return NextResponse.json(task, { status: 200 })
  } catch (error) {
    console.error("[API] PATCH /api/tasks/[id] error:", error)

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    if (error instanceof Error && error.message === "Task not found") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/tasks/[id]
 * Delete a task
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await TaskService.deleteTask(id)

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[API] DELETE /api/tasks/[id] error:", error)

    if (error instanceof Error && error.message === "Task not found") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
