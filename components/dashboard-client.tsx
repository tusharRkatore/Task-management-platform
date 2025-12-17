"use client"

import { TaskFlowLogo } from "@/components/custom-logo"
import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Filter,
  ListTodo,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Target,
  Trash2,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

type Task = {
  id: string
  title: string
  description: string | null
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date: string | null
  user_id: string
  created_at: string
  updated_at: string
}

type DashboardUser = {
  id: string
  email?: string
}

export default function DashboardClient({
  initialTasks,
  user,
}: {
  initialTasks: Task[]
  user: DashboardUser
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Task["status"],
    priority: "medium" as Task["priority"],
    due_date: "",
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, searchQuery, statusFilter, priorityFilter])

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    }
  }, [tasks])

  // ✅ FIXED
  const handleLogout = async () => {
    const supabase = createClient()
    if (!supabase) return

    await supabase.auth.signOut()
    router.push("/")
  }

  // ✅ FIXED
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    if (!supabase) {
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: formData.title,
            description: formData.description || null,
            status: formData.status,
            priority: formData.priority,
            due_date: formData.due_date || null,
            user_id: user.id,
          },
        ])
        .select()
        .single()

      if (error) throw error

      setTasks([data, ...tasks])
      setIsCreateOpen(false)
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        due_date: "",
      })
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ FIXED
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTask) return

    setIsLoading(true)
    const supabase = createClient()
    if (!supabase) {
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: formData.title,
          description: formData.description || null,
          status: formData.status,
          priority: formData.priority,
          due_date: formData.due_date || null,
        })
        .eq("id", editingTask.id)
        .select()
        .single()

      if (error) throw error

      setTasks(tasks.map((t) => (t.id === data.id ? data : t)))
      setEditingTask(null)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ FIXED
  const handleDeleteTask = async (taskId: string) => {
    const supabase = createClient()
    if (!supabase) return

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId)
      if (error) throw error
      setTasks(tasks.filter((t) => t.id !== taskId))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }


  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      due_date: task.due_date ? new Date(task.due_date).toISOString().split("T")[0] : "",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 text-white border-red-700"
      case "medium":
        return "bg-amber-600 text-white border-amber-700"
      case "low":
        return "bg-blue-600 text-white border-blue-700"
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white border-green-700"
      case "in-progress":
        return "bg-purple-600 text-white border-purple-700"
      case "todo":
        return "bg-slate-600 text-white border-slate-700"
      default:
        return ""
    }
  }

  return (
    <div className="flex min-h-screen flex-col animated-gradient relative">
      <div className="absolute inset-0 mesh-gradient"></div>
      <div className="relative z-10">
        <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <TaskFlowLogo />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                  <ListTodo className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setActiveView("dashboard")}
                  className={`text-sm font-medium transition-colors ${
                    activeView === "dashboard"
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView("my-tasks")}
                  className={`text-sm font-medium transition-colors ${
                    activeView === "my-tasks"
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  My Tasks
                </button>
                <button
                  onClick={() => setActiveView("all-tasks")}
                  className={`text-sm font-medium transition-colors ${
                    activeView === "all-tasks"
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  All Tasks
                </button>
              </nav>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
                    <span className="text-sm font-semibold text-white">{user.email?.charAt(0).toUpperCase()}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Welcome back! 👋
                  </h1>
                  <p className="text-lg text-muted-foreground">Here's what's happening with your tasks today</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Create New Task</DialogTitle>
                      <DialogDescription>Add a new task to your list and stay organized</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter task title..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Add more details about this task..."
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  status: value as Task["status"],
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                              value={formData.priority}
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  priority: value as Task["priority"],
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="due-date">Due Date</Label>
                          <Input
                            id="due-date"
                            type="date"
                            value={formData.due_date}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="gradient-primary text-white border-0">
                          {isLoading ? "Creating..." : "Create Task"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 hover:shadow-lg transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 gradient-primary opacity-10 rounded-bl-full"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    Total Tasks
                    <Target className="h-5 w-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{taskStats.total}</div>
                  <p className="text-xs text-muted-foreground mt-1">All your tasks</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-500/10 rounded-bl-full"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    To Do
                    <Clock className="h-5 w-5 text-gray-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-700">{taskStats.todo}</div>
                  <p className="text-xs text-muted-foreground mt-1">Pending tasks</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    In Progress
                    <Zap className="h-5 w-5 text-purple-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{taskStats.inProgress}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active tasks</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full"></div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    Completed
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{taskStats.completed}</div>
                  <p className="text-xs text-muted-foreground mt-1">Finished tasks</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6 border-2 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks by title or description..."
                      className="pl-10 h-11 border-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px] h-11 border-2">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-[160px] h-11 border-2">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredTasks.length === 0 ? (
                <Card className="border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <ListTodo className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
                    </h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                      {tasks.length === 0
                        ? "Get started by creating your first task and stay organized!"
                        : "Try adjusting your filters or search query."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredTasks.map((task) => (
                  <Card key={task.id} className="border-2 hover:shadow-lg transition-all hover:border-primary/50">
                    <CardContent className="flex items-start justify-between p-6">
                      <div className="flex-1">
                        <div className="mb-3 flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              task.status === "completed"
                                ? "bg-green-600"
                                : task.status === "in-progress"
                                  ? "bg-purple-600"
                                  : "bg-slate-600"
                            }`}
                          >
                            {task.status === "completed" ? (
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            ) : task.status === "in-progress" ? (
                              <Zap className="h-5 w-5 text-white" />
                            ) : (
                              <Clock className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{task.title}</h3>
                            {task.description && (
                              <p className="text-muted-foreground leading-relaxed">{task.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-13">
                          <Badge className={`${getStatusColor(task.status)} font-medium px-3 py-1`}>
                            {task.status === "in-progress"
                              ? "In Progress"
                              : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                          <Badge className={`${getPriorityColor(task.priority)} font-medium px-3 py-1`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </Badge>
                          {task.due_date && (
                            <Badge variant="outline" className="font-medium px-3 py-1 border-2">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(task.due_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => openEditDialog(task)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      <Dialog
        open={!!editingTask}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTask(null)
            setFormData({
              title: "",
              description: "",
              status: "todo",
              priority: "medium",
              due_date: "",
            })
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Task</DialogTitle>
            <DialogDescription>Update your task information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateTask}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  placeholder="Enter task title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Add more details about this task..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Task["status"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        priority: value as Task["priority"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-due-date">Due Date</Label>
                <Input
                  id="edit-due-date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="gradient-primary text-white border-0">
                {isLoading ? "Updating..." : "Update Task"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
