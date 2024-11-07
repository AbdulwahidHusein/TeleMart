'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/types/Product'

interface ProductDetailsProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg overflow-hidden transition-colors duration-200">
        <div className="relative">
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.name} - Image ${currentImageIndex + 1}`} 
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
            aria-label="Close product details"
          >
            <X size={24} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{product.name}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex justify-center mb-6">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentImageIndex 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => {
              onAddToCart(product)
              onClose()
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}