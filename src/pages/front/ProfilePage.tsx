'use client'

import { useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Profile from '../../components/Profile'
import Cart from '../../components/Cart'
import { Product } from '@/types/Product'
import { DarkModeContext } from '../../contexts/DarkModeContext'


export default function ProfilePage() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

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
        <Profile />
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