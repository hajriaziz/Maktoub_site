// ============================================
// TYPES POUR SCHÉMA SIMPLIFIÉ
// ============================================

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  created_at: Date
}

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  category_id: string
  images: string[] // JSON array
  sizes: string[] // JSON array
  colors: ProductColor[] // JSON array
  stock: Record<string, number> // JSON object {"S": 10, "M": 15, ...}
  featured: boolean
  created_at: Date
  updated_at: Date

  // Jointure avec category
  category_name?: string
  category_slug?: string
}

export interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  created_at: Date
}

export interface Address {
  id: string
  customer_id: string
  address_line: string
  city: string
  postal_code: string
  country: string
  created_at: Date
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  shipping_address_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  created_at: Date
  updated_at: Date

  // Jointures
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  shipping_address?: Address
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
}

// Type pour créer un nouveau produit
export interface CreateProductInput {
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  category_id: string
  images: string[]
  sizes: string[]
  colors: ProductColor[]
  stock: Record<string, number>
  featured?: boolean
}
