import { generateUUID, query, transaction } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"

// GET /api/orders/[id] - Récupérer une commande par son ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const sql = `
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total_amount,
        o.created_at,
        o.updated_at,
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        a.address_line,
        a.city,
        a.postal_code,
        a.country,
        GROUP_CONCAT(
          CONCAT(
            oi.id, '::',
            oi.product_name, '::',
            oi.size, '::',
            oi.color, '::',
            oi.quantity, '::',
            oi.unit_price
          ) SEPARATOR '|||'
        ) as items_data
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN addresses a ON o.shipping_address_id = a.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ?
      GROUP BY o.id, o.order_number, o.status, o.total_amount, o.created_at, o.updated_at,
               c.first_name, c.last_name, c.email, c.phone,
               a.address_line, a.city, a.postal_code, a.country
    `

    const [rows] = await query<any[]>(sql, [id])

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const row = rows[0]
    const itemsData = row.items_data ? row.items_data.split("|||") : []
    const items = itemsData.map((itemStr: string) => {
      const [id, product_name, size, color, quantity, unit_price] = itemStr.split("::")
      return {
        id,
        product_name,
        size,
        color,
        quantity: Number.parseInt(quantity),
        unit_price: Number.parseFloat(unit_price),
      }
    })

    const order = {
      id: row.id,
      order_number: row.order_number,
      status: row.status,
      total_amount: Number.parseFloat(row.total_amount),
      created_at: row.created_at,
      updated_at: row.updated_at,
      customer: {
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        phone: row.phone || null,
      },
      address: {
        address_line: row.address_line,
        city: row.city,
        postal_code: row.postal_code,
        country: row.country,
      },
      items,
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("[v0] Error fetching order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/orders/[id] - Mettre à jour le statut d'une commande
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status required" }, { status: 400 })
    }

    await transaction(async (connection) => {
      const [result] = await connection.execute(
        `UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?`,
        [status, id]
      )

      if ((result as any).affectedRows === 0) {
        throw new Error("Order not found")
      }
    })

    // Récupérer la commande mise à jour
    const [rows] = await query<any[]>(
      `SELECT id, order_number, status, total_amount, created_at, updated_at FROM orders WHERE id = ?`,
      [id]
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Order not found after update" }, { status: 404 })
    }

    const updatedOrder = rows[0]

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    console.error("[v0] Error updating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}