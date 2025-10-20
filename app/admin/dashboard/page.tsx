"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    console.log("Token in AdminPage (client-side):", token)
    if (!token) {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <main className="min-h-screen">
      <Navigation />
      <AdminDashboard />
      <Footer />
    </main>
  )
}