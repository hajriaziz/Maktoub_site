"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Edit } from "lucide-react"

// Définition des interfaces pour typer les données
interface Item {
  id: string
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
}

interface Address {
  address_line: string
  city: string
  postal_code: string
  country: string
}

interface Customer {
  first_name: string
  last_name: string
  email: string
  phone: string | null
}

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  updated_at: string
  customer: Customer
  address: Address
  items: Item[]
  subtotal?: number // Optionnel
  shipping_cost?: number // Optionnel
  total?: number // Optionnel
}

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searchOrderNumber, setSearchOrderNumber] = useState("")

  async function searchOrders() {
    if (!searchOrderNumber) {
      console.log("No order number provided, search aborted.")
      return
    }

    try {
      setLoading(true)
      console.log(`Fetching orders for order_number: ${searchOrderNumber}`)
      const res = await fetch(`/api/orders?order_number=${encodeURIComponent(searchOrderNumber)}`)
      const data = await res.json()
      console.log("Raw API Response:", data)

      if (!data.success) {
        console.error("API returned failure:", data.error)
        setOrders([])
        return
      }

      if (!Array.isArray(data.orders)) {
        console.error("Expected 'orders' to be an array, got:", data.orders)
        setOrders([])
        return
      }

      // Vérification des données avant de les setter avec valeurs par défaut
      const validOrders = data.orders.map((order: Order) => ({
        ...order,
        items: Array.isArray(order.items) ? order.items : [],
        subtotal: order.total_amount || 0, // Valeur par défaut si absent
        shipping_cost: order.shipping_cost || 0, // Valeur par défaut si absent
        total: order.total_amount || 0, // Valeur par défaut si absent
      }))
      setOrders(validOrders)
      console.log("Orders set to:", validOrders)
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
        <h1 className="text-4xl font-sans font-normal mb-8">Gestion des commandes</h1>
        {/* Search */}
        <Card className="p-6 mb-8">
          <div className="space-y-6">
            {/* Section de recherche */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                  <h6 className="mb-2">Rechercher par numéro de commande</h6>
                    <Label htmlFor="orderNumber"></Label>
                      <Input
                        id="orderNumber"
                        type="text"
                        placeholder="Ex: MKT-1634567890123"
                        value={searchOrderNumber}
                        onChange={(e) => setSearchOrderNumber(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchOrders()}
                        />
                  </div>
                  <Button onClick={searchOrders} disabled={loading} className="mt-auto">
                        {loading ? "Recherche..." : "Rechercher"}
                  </Button>
            </div>

            {/* Lien de retour */}
            <div className="flex justify-end">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="lg" className="font-medium">
                  <Edit className="h-5 w-5 mr-2" />
                  Retour au Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchOrderNumber
                  ? "Aucune commande trouvée pour ce numéro"
                  : "Entrez un numéro de commande pour rechercher"}
              </p>
            </Card>
          ) : (
            orders.map((order: Order) => {
              console.log("Rendering order:", order)
              return (
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
                    <Badge variant={order.status === "pending" ? "secondary" : "default"} className="bg-chart-1">{order.status}</Badge>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Client</h4>
                    <p className="text-sm">
                      {order.customer?.first_name || "N/A"} {order.customer?.last_name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.customer?.email || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">{order.customer?.phone || "N/A"}</p>
                  </div>

                  {/* Address */}
                  {order.address && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Adresse de livraison</h4>
                      <p className="text-sm">{order.address.address_line || "N/A"}</p>
                      <p className="text-sm">
                        {order.address.postal_code || ""} {order.address.city || ""}
                      </p>
                      <p className="text-sm">{order.address.country || "N/A"}</p>
                    </div>
                  )}

                  {/* Items */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Articles</h4>
                    <div className="space-y-2">
                      {(order.items || []).map((item: Item, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.product_name || "N/A"} ({item.size || "N/A"}, {item.color || "N/A"}) x{item.quantity || 0}
                          </span>
                          <span className="font-medium">{(item.unit_price || 0).toFixed(2)}TND</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sous-total</span>
                      <span className="text-sm">{(order.subtotal || 0).toFixed(2)}TND</span> {/* Ajout de la vérification */}
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Livraison</span>
                      <span className="text-sm">{(order.shipping_cost || 0).toFixed(2)}TND</span> {/* Ajout de la vérification */}
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-accent">{(order.total || 0).toFixed(2)}TND</span> {/* Ajout de la vérification */}
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
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}