import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CheckoutForm />
      <Footer />
    </main>
  )
}
