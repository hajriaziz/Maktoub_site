import { query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"

// PATCH /api/admin/products/[id] - Mettre à jour un produit
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, slug, description, longDescription, price, categoryId, images, sizes, colors, stock, featured } = body

    const updates: string[] = []
    const values: any[] = []

    if (name !== undefined) {
      updates.push("name = ?")
      values.push(name)
    }
    if (slug !== undefined) {
      updates.push("slug = ?")
      values.push(slug)
    }
    if (description !== undefined) {
      updates.push("description = ?")
      values.push(description)
    }
    if (longDescription !== undefined) {
      updates.push("long_description = ?")
      values.push(longDescription)
    }
    if (price !== undefined) {
      updates.push("price = ?")
      values.push(price)
    }
    if (categoryId !== undefined) {
      updates.push("category_id = ?")
      values.push(categoryId)
    }
    if (images !== undefined) {
      updates.push("images = ?")
      values.push(JSON.stringify(images))
    }
    if (sizes !== undefined) {
      updates.push("sizes = ?")
      values.push(JSON.stringify(sizes))
    }
    if (colors !== undefined) {
      updates.push("colors = ?")
      values.push(JSON.stringify(colors))
    }
    if (stock !== undefined) {
      updates.push("stock = ?")
      values.push(JSON.stringify(stock))
    }
    if (featured !== undefined) {
      updates.push("featured = ?")
      values.push(featured)
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 })
    }

    values.push(id)

    const sql = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`

    await query(sql, values)

    return NextResponse.json({ success: true, message: "Product updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE /api/admin/products/[id] - Supprimer un produit
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await query("DELETE FROM products WHERE id = ?", [id])

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
