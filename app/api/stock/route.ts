import { queryOne } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const productId = searchParams.get("productId")
    const sizeName = searchParams.get("size")

    if (!productId || !sizeName) {
      return NextResponse.json({ error: "Product ID and size required" }, { status: 400 })
    }

    // Requête SQL pour récupérer le stock d'un produit spécifique
    const sql = `
      SELECT stock
      FROM products
      WHERE id = ?
    `

    const row = await queryOne<any>(sql, [productId])

    if (!row) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Parser le champ stock (supposé être un JSON)
    const stock = JSON.parse(row.stock)
    const quantity = stock[sizeName] || 0

    return NextResponse.json({
      available: quantity > 0,
      quantity,
    })
  } catch (error) {
    console.error("[v0] Error checking stock:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}