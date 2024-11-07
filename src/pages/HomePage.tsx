'use client'

import { useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Cart from '../components/Cart'
import ProductDetails from '../components/ProductDetails'
import Footer from '../components/Footer'
import { products } from '../utils/constants'
import { Product } from '@/types/Product'
import { DarkModeContext } from '../contexts/DarkModeContext'

export default function HomePage() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { darkMode } = useContext(DarkModeContext)

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
      />
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  )
}