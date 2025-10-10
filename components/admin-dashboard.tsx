"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingCart, Users, TrendingUp, Edit } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      setLoading(true)

      // Fetch products
      const productsRes = await fetch("/api/products")
      const productsData = await productsRes.json()
      setProducts(productsData.products || [])

      // Fetch orders
      const ordersRes = await fetch("/api/orders")
      const ordersData = await ordersRes.json()
      setOrders(ordersData.orders || [])

      // Calculate stats
      const totalOrders = ordersData.orders?.length || 0
      const totalRevenue = ordersData.orders?.reduce((sum: number, order: any) => sum + order.total_amount, 0) || 0
      const pendingOrders = ordersData.orders?.filter((order: any) => order.status === "pending").length || 0

      setStats({
        totalOrders,
        totalRevenue,
        totalProducts: productsData.products?.length || 0,
        pendingOrders,
      })
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
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
        fetchDashboardData()
      }
    } catch (error) {
      console.error("[v0] Error updating order:", error)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Tableau de bord</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground font-light">Commandes totales</p>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground font-light">Revenu total</p>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stats.totalRevenue.toFixed(2)}€</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground font-light">Produits</p>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground font-light">En attente</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="stock">Stock</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Commandes récentes</h2>
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Aucune commande pour le moment</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer?.first_name} {order.customer?.last_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.total_amount.toFixed(2)}€</p>
                          <Badge variant={order.status === "pending" ? "secondary" : "default"}>{order.status}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "processing")}>
                          En cours
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "shipped")}>
                          Expédié
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "delivered")}>
                          Livré
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Gestion des produits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category?.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-accent">{product.price.toFixed(2)}€</p>
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "En stock" : "Rupture"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <Link href="/admin/products">
                  <Button size="lg" variant="default" className="font-medium">
                    <Edit className="h-5 w-5 mr-2" />
                    Gérer les Produits
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          {/* Stock Tab */}
          <TabsContent value="stock" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Gestion du stock</h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {product.sizes.map((size: string) => (
                        <div key={size} className="border rounded p-2 text-center">
                          <p className="text-sm font-medium">{size}</p>
                          <p className="text-xs text-muted-foreground">Stock disponible</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}