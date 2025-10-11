import { generateUUID, query, transaction } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(JSON.stringify(body, null, 2)); // Ajout pour débogage
    const { customerInfo, items, total } = body

    // Validation des champs requis
    if (!customerInfo || !items || !Array.isArray(items) || items.length === 0 || total === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields: customerInfo, items, or total" }, { status: 400 })
    }
    if (typeof total !== 'number') {
      return Response.json({ success: false, error: "Total must be a number" }, { status: 400 })
    }
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.postalCode) {
      return Response.json({ success: false, error: "Missing required customer fields" }, { status: 400 })
    }

    // Validation des items
    for (const [index, item] of items.entries()) {
      const missingFields = [];
      if (!item.productId) missingFields.push("productId");
      if (!item.productName) missingFields.push("productName");
      if (item.quantity === undefined) missingFields.push("quantity");
      if (item.price === undefined) missingFields.push("price");
      if (!item.selectedSize) missingFields.push("selectedSize"); // Obligatoire
      if (!item.selectedColor) missingFields.push("selectedColor"); // Obligatoire
      if (missingFields.length > 0) {
        return Response.json({ success: false, error: `Missing required fields in item ${index}: ${missingFields.join(", ")}` }, { status: 400 })
      }
      if (typeof item.quantity !== 'number' || typeof item.price !== 'number') {
        return Response.json({ success: false, error: `Invalid type for quantity or price in item ${index}` }, { status: 400 })
      }
    }

    const result = await transaction(async (connection) => {
      // 1. Créer ou récupérer le client
      const [existingCustomers] = await connection.execute("SELECT id FROM customers WHERE email = ?", [
        customerInfo.email,
      ])

      let customerId: string

      if ((existingCustomers as any[]).length > 0) {
        customerId = (existingCustomers as any[])[0].id
      } else {
        customerId = generateUUID()
        await connection.execute(
          `INSERT INTO customers (id, first_name, last_name, email, phone)
           VALUES (?, ?, ?, ?, ?)`,
          [customerId, customerInfo.firstName, customerInfo.lastName, customerInfo.email, customerInfo.phone || null],
        )
      }

      // 2. Créer l'adresse
      const addressId = generateUUID()
      await connection.execute(
        `INSERT INTO addresses (id, customer_id, address_line, city, postal_code, country)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          addressId,
          customerId,
          customerInfo.address,
          customerInfo.city,
          customerInfo.postalCode,
          customerInfo.country || "France",
        ],
      )

      // 3. Créer la commande
      const orderId = generateUUID()
      const orderNumber = `MKT-${Date.now()}`

      await connection.execute(
        `INSERT INTO orders (id, order_number, customer_id, shipping_address_id, total_amount, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
        [orderId, orderNumber, customerId, addressId, total],
      )

      // 4. Créer les articles de commande et mettre à jour le stock
      for (const item of items) {
        const orderItemId = generateUUID()

        await connection.execute(
          `INSERT INTO order_items (id, order_id, product_id, product_name, size, color, quantity, unit_price)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderItemId,
            orderId,
            item.productId,
            item.productName,
            item.selectedSize,
            item.selectedColor,
            item.quantity,
            item.price,
          ],
        )

        // Mettre à jour le stock dans le JSON
        const [productRows] = await connection.execute("SELECT stock FROM products WHERE id = ?", [item.productId])

        if ((productRows as any[]).length > 0) {
          const currentStock = JSON.parse((productRows as any[])[0].stock || '{}')
          const size = item.selectedSize

          if (currentStock[size] !== undefined) {
            currentStock[size] = Math.max(0, currentStock[size] - item.quantity)
            await connection.execute("UPDATE products SET stock = ?, updated_at = NOW() WHERE id = ?", [
              JSON.stringify(currentStock),
              item.productId,
            ])
          } else {
            throw new Error(`Invalid size ${size} for product ${item.productId}. Available sizes: ${Object.keys(currentStock).join(", ")}`)
          }
        } else {
          throw new Error(`Product not found: ${item.productId}`)
        }
      }

      return { orderNumber, orderId }
    })

    return Response.json({
      success: true,
      orderNumber: result.orderNumber,
      orderId: result.orderId,
    })
  } catch (error: any) {
    console.error("[v0] Error creating order:", error.message, { stack: error.stack })
    return Response.json({ success: false, error: "Failed to create order: " + error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get("order_number")

    let sql = `
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
    `

    const params: any[] = []

    if (orderNumber) {
      sql += " WHERE o.order_number = ?"
      params.push(orderNumber)
    }

    sql += `
      GROUP BY o.id, o.order_number, o.status, o.total_amount, o.created_at, o.updated_at,
               c.first_name, c.last_name, c.email, c.phone,
               a.address_line, a.city, a.postal_code, a.country
      ORDER BY o.created_at DESC
    `

    const rows = await query<any>(sql, params)
    console.log("Raw DB Rows:", rows) // Ajout pour déboguer les lignes brutes

    const orders = rows.map((row) => {
      console.log("Processing row:", row) // Débogage par ligne
      const itemsData = row.items_data ? row.items_data.split("|||") : []
      console.log("Items data split:", itemsData) // Vérifie le parsing des items
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

      return {
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
    })

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error("[v0] Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}