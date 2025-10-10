export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  collection: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
}
