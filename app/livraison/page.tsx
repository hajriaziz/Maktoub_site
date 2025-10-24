"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import LivraisonDetails from "@/components/livraison-details"

export default function LivraisonPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <LivraisonDetails />
        </div>
      </div>
      <Footer />
    </main>
  )
}
