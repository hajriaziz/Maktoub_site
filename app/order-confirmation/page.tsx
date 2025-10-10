import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <OrderConfirmation />
      <Footer />
    </main>
  )
}
