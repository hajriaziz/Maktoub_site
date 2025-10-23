import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { Toaster } from "@/components/ui/toaster"

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products/${slug}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.product
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
}

async function getAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product: any) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}
