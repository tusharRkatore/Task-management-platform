/**
 * Custom hook for dashboard statistics using SWR
 */
"use client"

import useSWR from "swr"
import type { DashboardStats } from "@/lib/types/task"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export function useDashboardStats() {
  const { data, error, isLoading } = useSWR<DashboardStats>("/api/dashboard/stats", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  return {
    stats: data,
    isLoading,
    isError: error,
  }
}
