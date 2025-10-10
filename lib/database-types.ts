// Types TypeScript pour la base de données

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          long_description: string | null
          price: number
          category_id: string | null
          in_stock: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          display_order: number
          created_at: string
        }
      }
      sizes: {
        Row: {
          id: string
          name: string
          display_order: number
        }
      }
      colors: {
        Row: {
          id: string
          name: string
          hex_code: string
        }
      }
      product_sizes: {
        Row: {
          id: string
          product_id: string
          size_id: string
          stock_quantity: number
        }
      }
      product_colors: {
        Row: {
          id: string
          product_id: string
          color_id: string
        }
      }
      customers: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["customers"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>
      }
      addresses: {
        Row: {
          id: string
          customer_id: string
          address_line: string
          city: string
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["addresses"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["addresses"]["Insert"]>
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string | null
          address_id: string | null
          status: string
          subtotal: number
          shipping_cost: number
          total: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          product_price: number
          quantity: number
          selected_size: string | null
          selected_color: string | null
          subtotal: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id" | "created_at">
      }
    }
  }
}

// Types pour les produits avec relations
export interface ProductWithDetails {
  id: string
  name: string
  slug: string
  description: string | null
  long_description: string | null
  price: number
  in_stock: boolean
  featured: boolean
  category: {
    name: string
    slug: string
  } | null
  images: Array<{
    image_url: string
    display_order: number
  }>
  sizes: Array<{
    name: string
    stock_quantity: number
  }>
  colors: Array<{
    name: string
    hex_code: string
  }>
}

// Types pour les commandes avec relations
export interface OrderWithDetails {
  id: string
  order_number: string
  status: string
  subtotal: number
  shipping_cost: number
  total: number
  created_at: string
  customer: {
    first_name: string
    last_name: string
    email: string
    phone: string | null
  } | null
  address: {
    address_line: string
    city: string
    postal_code: string
    country: string
  } | null
  items: Array<{
    product_name: string
    product_price: number
    quantity: number
    selected_size: string | null
    selected_color: string | null
    subtotal: number
  }>
}
