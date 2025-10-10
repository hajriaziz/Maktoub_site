import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

// GET /api/stock?productId=xxx&size=M - Vérifier le stock d'un produit
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)

    const productId = searchParams.get("productId")
    const sizeName = searchParams.get("size")

    if (!productId || !sizeName) {
      return NextResponse.json({ error: "Product ID and size required" }, { status: 400 })
    }

    // Récupérer l'ID de la taille
    const { data: sizeData } = await supabase.from("sizes").select("id").eq("name", sizeName).single()

    if (!sizeData) {
      return NextResponse.json({ error: "Size not found" }, { status: 404 })
    }

    // Récupérer le stock
    const { data: stockData, error } = await supabase
      .from("product_sizes")
      .select("stock_quantity")
      .eq("product_id", productId)
      .eq("size_id", sizeData.id)
      .single()

    if (error || !stockData) {
      return NextResponse.json({ available: false, quantity: 0 })
    }

    return NextResponse.json({
      available: stockData.stock_quantity > 0,
      quantity: stockData.stock_quantity,
    })
  } catch (error) {
    console.error("[v0] Error checking stock:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
