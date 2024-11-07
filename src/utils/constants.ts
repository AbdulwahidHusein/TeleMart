import { Product } from "@/types/Product"

export const products: Product[] = [
  { 
    id: 1, 
    name: "Stylish T-Shirt", 
    price: 29.99, 
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300&text=T-Shirt+Front",
      "/placeholder.svg?height=400&width=300&text=T-Shirt+Back"
    ],
    description: "A comfortable and trendy t-shirt made from 100% organic cotton. Available in various sizes and colors."
  },
  { 
    id: 2, 
    name: "Comfy Jeans", 
    price: 59.99, 
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300&text=Jeans+Front",
      "/placeholder.svg?height=400&width=300&text=Jeans+Back"
    ],
    description: "Classic denim jeans with a modern fit. Durable and perfect for everyday wear."
  },
  { 
    id: 3, 
    name: "Elegant Watch", 
    price: 99.99, 
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300&text=Watch+Side",
      "/placeholder.svg?height=400&width=300&text=Watch+Close-up"
    ],
    description: "A sophisticated timepiece with a stainless steel case and genuine leather strap. Water-resistant up to 30 meters."
  },
  { 
    id: 4, 
    name: "Sneakers", 
    price: 79.99, 
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300&text=Sneakers+Side",
      "/placeholder.svg?height=400&width=300&text=Sneakers+Top"
    ],
    description: "Lightweight and breathable sneakers ideal for sports and casual wear. Features advanced cushioning technology for maximum comfort."
  },
]