"use client"

import { createClient } from "@/lib/supabase/client"
import type { Task, TaskFilterDTO } from "@/lib/types/task"
import { useEffect } from "react"
import useSWR from "swr"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch")
  }
  return res.json()
}

export function useTasks(filters?: TaskFilterDTO) {
  const params = new URLSearchParams()

  if (filters?.status) params.set("status", filters.status)
  if (filters?.priority) params.set("priority", filters.priority)
  if (filters?.search) params.set("search", filters.search)
  if (filters?.assigned_to_me) params.set("assigned_to_me", "true")
  if (filters?.created_by_me) params.set("created_by_me", "true")
  if (filters?.overdue) params.set("overdue", "true")

  const url = `/api/tasks${params.toString() ? `?${params.toString()}` : ""}`

  const { data, error, isLoading, mutate } = useSWR<Task[]>(url, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  // ✅ Realtime updates via Supabase (SAFE)
  useEffect(() => {
    const supabase = createClient()

    // 🛑 Guard against null
    if (!supabase) return

    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        () => {
          mutate()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [mutate])

  return {
    tasks: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useTask(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Task>(
    id ? `/api/tasks/${id}` : null,
    fetcher
  )

  return {
    task: data,
    isLoading,
    isError: error,
    mutate,
  }
}
