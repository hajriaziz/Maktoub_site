"use client"

import AdminProductsManager from "@/components/admin-products-manager"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function AdminProductsPage() {
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
          <AdminProductsManager />
          <Footer />
        </main>
  
  )
}
