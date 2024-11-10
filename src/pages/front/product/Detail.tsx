'use client'

import { useState, useContext } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DarkModeContext } from '../../../contexts/DarkModeContext'
import { Product } from '@/types/Product'
import { products } from '@/utils/constants'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Cart from '../../../components/Cart'

interface ProductDetailsPageProps {
  product: Product
}

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const { darkMode } = useContext(DarkModeContext)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.product.id === productId) {
          return newQuantity === 0 ? acc : [...acc, { ...item, quantity: newQuantity }]
        }
        return [...acc, item]
      }, [] as { product: Product; quantity: number }[])
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200`}>
      <Navbar cartItemCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-grow mt-16 mb-16 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="relative">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
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
                className={`w-3 h-3 rounded-full mx-1 ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>

          <button
            onClick={() => alert('Added to cart')}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </main>

      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
      />
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const productId = Number(params.id)
  const product = products.find((product) => product.id === productId)

  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      product
    }
  }
}
