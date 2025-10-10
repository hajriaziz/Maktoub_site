"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartContent } from "@/components/cart-content"

export default function CartPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <CartContent />
        </div>
      </div>
      <Footer />
    </main>
  )
}
