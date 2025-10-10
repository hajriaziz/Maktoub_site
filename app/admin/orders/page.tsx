import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AdminOrders } from "@/components/admin-orders"

export const metadata = {
  title: "Gestion des commandes - Maktoub Admin",
  description: "Gérer toutes les commandes",
}

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AdminOrders />
      <Footer />
    </main>
  )
}
