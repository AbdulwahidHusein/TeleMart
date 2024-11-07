'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import { Product } from '@/types/Product'

interface CartProps {
  isOpen: boolean
  onClose: () => void
  cart: { product: Product; quantity: number }[]
  updateQuantity: (productId: number, newQuantity: number) => void
}

export default function Cart({ isOpen, onClose, cart, updateQuantity }: CartProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto flex flex-col transition-colors duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Your Cart</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                <div className="flex items-center">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-1 transition-colors duration-200"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="mx-2 text-gray-800 dark:text-gray-200 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-1 transition-colors duration-200"
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total:</span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors duration-200"
            aria-label={`Checkout with ${totalItems} items for $${totalPrice.toFixed(2)}`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}