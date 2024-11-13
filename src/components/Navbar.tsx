'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Home, Search, User, Edit, ShoppingBag, ClipboardList, UsersRound, Utensils } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'

interface NavbarProps {
  cartItemCount: number
  onCartClick: () => void
}

export default function Navbar({ cartItemCount, onCartClick }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 sm:px-6 fixed top-0 left-0 right-0 z-10 transition-colors duration-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200">
          TeleShop
        </Link>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <button
            onClick={onCartClick}
            className="relative p-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
            aria-label={`View cart with ${cartItemCount} items`}
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
          <Link 
            href="/user-data"
            className={`flex flex-col items-center p-2 ${pathname === '/profile' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10 transition-colors duration-200">
        <div className="flex justify-around items-center py-2">
          <Link 
            href="/"
            className={`flex flex-col items-center p-2 ${pathname === '/' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            href="/search"
            className={`flex flex-col items-center p-2 ${pathname === '/search' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link 
            href="/my-orders"
            className={`flex flex-col items-center p-2 ${pathname === '/my-orders' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <ClipboardList size={24} />
            <span className="text-xs mt-1">My Orders</span>
          </Link>
          <Link 
            href="/my-store"
            className={`flex flex-col items-center p-2 ${pathname === '/my-store' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <Utensils size={24} />
            <span className="text-xs mt-1">My Store</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}