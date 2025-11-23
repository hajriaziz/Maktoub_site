"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

export default function ProductPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${apiUrl}/products/show.php?id=${id}`)
        const data = await res.json()
        setProduct(data.product || null)
      } catch (error) {
        console.error("Erreur réseau:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (!id) return <div className="p-12 text-center">Aucun produit sélectionné.</div>
  if (loading) return <div className="p-12 text-center">Chargement du produit...</div>
  if (!product) return <div className="p-12 text-center">Produit introuvable.</div>

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}
