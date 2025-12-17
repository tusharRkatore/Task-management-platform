// -----------------------------
// Enums (safer than string unions)
// -----------------------------
export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Urgent = "Urgent",
}

export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Review = "Review",
  Completed = "Completed",
}

// -----------------------------
// Core Models
// -----------------------------
export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  due_date: string | null
  priority: TaskPriority
  status: TaskStatus
  creator_id: string
  assigned_to_id: string | null
  created_at: string
  updated_at: string

  // Joined relations (optional)
  creator?: User
  assigned_to?: User
}

export interface Notification {
  id: string
  user_id: string
  task_id: string
  message: string
  is_read: boolean
  created_at: string

  task?: Task
}

export interface AuditLog {
  id: string
  task_id: string
  user_id: string
  action: string
  old_value: Record<string, any> | null
  new_value: Record<string, any> | null
  created_at: string

  user?: User
}

// -----------------------------
// Dashboard
// -----------------------------
export interface DashboardStats {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueTasks: number
  assignedToMe: number
  createdByMe: number
}

// -----------------------------
// Filters (used by hooks / APIs)
// -----------------------------
export interface TaskFilterDTO {
  status?: TaskStatus
  priority?: TaskPriority
  search?: string
  assigned_to_me?: boolean
  created_by_me?: boolean
  overdue?: boolean
}
