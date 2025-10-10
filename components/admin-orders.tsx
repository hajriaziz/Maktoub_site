"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchEmail, setSearchEmail] = useState("")

  async function searchOrders() {
    if (!searchEmail) return

    try {
      setLoading(true)
      const res = await fetch(`/api/orders?email=${encodeURIComponent(searchEmail)}`)
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("[v0] Error searching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        searchOrders()
      }
    } catch (error) {
      console.error("[v0] Error updating order:", error)
    }
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Gestion des commandes</h1>

        {/* Search */}
        <Card className="p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="email">Rechercher par email client</Label>
              <Input
                id="email"
                type="email"
                placeholder="client@email.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchOrders()}
              />
            </div>
            <Button onClick={searchOrders} disabled={loading} className="mt-auto">
              {loading ? "Recherche..." : "Rechercher"}
            </Button>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchEmail
                  ? "Aucune commande trouvée pour cet email"
                  : "Entrez un email pour rechercher des commandes"}
              </p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{order.order_number}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge variant={order.status === "pending" ? "secondary" : "default"}>{order.status}</Badge>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Client</h4>
                  <p className="text-sm">
                    {order.customer?.first_name} {order.customer?.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.customer?.email}</p>
                  <p className="text-sm text-muted-foreground">{order.customer?.phone}</p>
                </div>

                {/* Address */}
                {order.address && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Adresse de livraison</h4>
                    <p className="text-sm">{order.address.address_line}</p>
                    <p className="text-sm">
                      {order.address.postal_code} {order.address.city}
                    </p>
                    <p className="text-sm">{order.address.country}</p>
                  </div>
                )}

                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Articles</h4>
                  <div className="space-y-2">
                    {order.items?.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.product_name} ({item.selected_size}, {item.selected_color}) x{item.quantity}
                        </span>
                        <span className="font-medium">{item.subtotal.toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Sous-total</span>
                    <span className="text-sm">{order.subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Livraison</span>
                    <span className="text-sm">{order.shipping_cost.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">{order.total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "processing")}>
                    En cours
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "shipped")}>
                    Expédié
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "delivered")}>
                    Livré
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "cancelled")}>
                    Annulé
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
