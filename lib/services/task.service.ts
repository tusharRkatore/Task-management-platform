/**
 * Task Service
 * Business logic layer for task operations
 * Implements validation, error handling, and orchestrates repository calls
 */
import { TaskRepository } from "@/lib/repositories/task.repository"
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskDTO,
  type UpdateTaskDTO,
  type TaskFilterDTO,
} from "@/lib/validation/task.schemas"
import type { Task, DashboardStats } from "@/lib/types/task"

export class TaskService {
  /**
   * Get all tasks with filtering
   * @param filters - Optional filters for tasks
   * @returns Array of tasks
   */
  static async getAllTasks(filters?: TaskFilterDTO): Promise<Task[]> {
    try {
      return await TaskRepository.findAll(filters)
    } catch (error) {
      console.error("[TaskService] Error fetching tasks:", error)
      throw new Error("Failed to fetch tasks")
    }
  }

  /**
   * Get a single task by ID
   * @param id - Task ID
   * @returns Task or null if not found
   */
  static async getTaskById(id: string): Promise<Task | null> {
    try {
      return await TaskRepository.findById(id)
    } catch (error) {
      console.error("[TaskService] Error fetching task:", error)
      throw new Error("Failed to fetch task")
    }
  }

  /**
   * Create a new task with validation
   * @param dto - Task creation data
   * @param creatorId - ID of the user creating the task
   * @returns Created task
   */
  static async createTask(dto: CreateTaskDTO, creatorId: string): Promise<Task> {
    try {
      // Validate input using Zod schema
      const validatedData = createTaskSchema.parse(dto)

      return await TaskRepository.create(validatedData, creatorId)
    } catch (error) {
      console.error("[TaskService] Error creating task:", error)
      if (error instanceof Error && error.message.includes("validation")) {
        throw error
      }
      throw new Error("Failed to create task")
    }
  }

  /**
   * Update an existing task with validation
   * @param id - Task ID
   * @param dto - Task update data
   * @returns Updated task
   */
  static async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    try {
      // Validate input using Zod schema
      const validatedData = updateTaskSchema.parse(dto)

      // Check if task exists
      const existingTask = await TaskRepository.findById(id)
      if (!existingTask) {
        throw new Error("Task not found")
      }

      return await TaskRepository.update(id, validatedData)
    } catch (error) {
      console.error("[TaskService] Error updating task:", error)
      if (error instanceof Error && error.message.includes("validation")) {
        throw error
      }
      throw new Error("Failed to update task")
    }
  }

  /**
   * Delete a task
   * @param id - Task ID
   */
  static async deleteTask(id: string): Promise<void> {
    try {
      // Check if task exists
      const existingTask = await TaskRepository.findById(id)
      if (!existingTask) {
        throw new Error("Task not found")
      }

      await TaskRepository.delete(id)
    } catch (error) {
      console.error("[TaskService] Error deleting task:", error)
      throw new Error("Failed to delete task")
    }
  }

  /**
   * Get dashboard statistics for the current user
   * @returns Dashboard statistics
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await TaskRepository.getStats()
    } catch (error) {
      console.error("[TaskService] Error fetching stats:", error)
      throw new Error("Failed to fetch dashboard statistics")
    }
  }
}
