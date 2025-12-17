// DTOs with Zod validation for all API endpoints
import { z } from "zod"

export const taskPriorityEnum = z.enum(["Low", "Medium", "High", "Urgent"])
export const taskStatusEnum = z.enum(["To Do", "In Progress", "Review", "Completed"])

/**
 * DTO for creating a new task
 * Validates all required fields according to business rules
 */
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  description: z.string().optional(),
  due_date: z.string().datetime().optional(),
  priority: taskPriorityEnum,
  status: taskStatusEnum.default("To Do"),
  assigned_to_id: z.string().uuid().nullable().optional(),
})

export type CreateTaskDTO = z.infer<typeof createTaskSchema>

/**
 * DTO for updating an existing task
 * All fields are optional to support partial updates
 */
export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().nullable().optional(),
  due_date: z.string().datetime().nullable().optional(),
  priority: taskPriorityEnum.optional(),
  status: taskStatusEnum.optional(),
  assigned_to_id: z.string().uuid().nullable().optional(),
})

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>

/**
 * DTO for task filtering
 */
export const taskFilterSchema = z.object({
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  search: z.string().optional(),
  assigned_to_me: z.boolean().optional(),
  created_by_me: z.boolean().optional(),
  overdue: z.boolean().optional(),
})

export type TaskFilterDTO = z.infer<typeof taskFilterSchema>

/**
 * DTO for user profile updates
 */
export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  avatar_url: z.string().url().optional(),
})

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>
