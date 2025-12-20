import TaskRepository from "@/lib/repositories/task.repository"
import type { DashboardStats, Task } from "@/lib/types/task"
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskDTO,
  type TaskFilterDTO,
  type UpdateTaskDTO,
} from "@/lib/validation/task.schemas"

export class TaskService {
  static getAllTasks(filters?: TaskFilterDTO): Promise<Task[]> {
    return TaskRepository.findAll(filters)
  }

  static getTaskById(id: string): Promise<Task | null> {
    return TaskRepository.findById(id)
  }

  static createTask(dto: CreateTaskDTO, creatorId: string): Promise<Task> {
    const validated = createTaskSchema.parse(dto)
    return TaskRepository.create(validated, creatorId)
  }

  static updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const validated = updateTaskSchema.parse(dto)
    return TaskRepository.update(id, validated)
  }

  static deleteTask(id: string): Promise<void> {
    return TaskRepository.delete(id)
  }

  static getDashboardStats(): Promise<DashboardStats> {
    return TaskRepository.getStats()
  }
}
