'use client'

import { Eye } from 'lucide-react'
import { Product } from '@/types/Product'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col transition-colors duration-200">
      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href={`product/${product.id}`}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <Eye size={16} className="mr-2" />
            Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
