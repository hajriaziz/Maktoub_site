import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata = {
  title: "Administration - Maktoub",
  description: "Panneau d'administration Maktoub",
}

export default function AdminPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AdminDashboard />
      <Footer />
    </main>
  )
}
