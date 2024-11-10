'use client'

import { useState, useContext } from 'react'
import AdminProductCard from '@/components/AdminProductCard'
import StoreHeader from '@/components/StoreHeader'
import AdminProductDialog from '@/components/AdminProductDialog'
import UploadDialog from '@/components/ProductUploadModal'
import { Navbar, Footer } from '@/components'

import { DarkModeContext } from '@/contexts/DarkModeContext'
import { Product } from '@/types/Product'
import { AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoMdListBox } from 'react-icons/io'
import { useRouter } from 'next/navigation'

import { products } from '@/utils/constants'

// Mock data for store items
const storeItems = products

export default function MyStorePage() {
  const [items, setItems] = useState<Product[]>(storeItems)
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const router = useRouter()

  const handleViewDetails = (item: Product) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleUploadProduct = (formData: FormData) => {
    console.log(formData) // Handle the product upload logic
    setIsUploadDialogOpen(false)
  }

  return (
    <div className={`bg-white dark:bg-gray-900 min-h-screen transition-colors`}>
      {/* Navbar */}
      <Navbar cartItemCount={0} onCartClick={() => {}} />

      {/* Page Content with Padding */}
      <div className="p-4 pt-24 sm:pt-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left mb-6">
          My Store
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {items.map(item => (
            <AdminProductCard key={item.id} item={item} onViewDetails={() => handleViewDetails(item)} />
          ))}
        </div>
      </div>

      {/* Product Detail Dialog */}
      {isDialogOpen && selectedItem && (
        <AdminProductDialog 
          item={selectedItem} 
          onClose={() => setIsDialogOpen(false)} 
          onEdit={() => {/* Handle edit logic */}}
          onDelete={() => {/* Handle delete logic */}}
        />
      )}

      {/* Upload Product Dialog */}
      {isUploadDialogOpen && <UploadDialog onCancel={() => setIsUploadDialogOpen(false)} onSubmit={handleUploadProduct}  />}

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="md:hidden p-3 mb-4 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors fixed top-0 left-0 z-10"
      >
        &#8592; Back
      </button>

      {/* Footer */}
      <Footer />

      {/* Fixed Mobile Footer (only visible on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 z-20 p-4 flex justify-around items-center border-t border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setIsUploadDialogOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <AiOutlinePlus size={24} />
        </button>
        <button
          onClick={() => alert('View Orders clicked')}
          className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <IoMdListBox size={24} />
        </button>
        <button
          className="p-3 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
        >
          <AiOutlineShoppingCart size={24} />
        </button>
      </div>
    </div>
  )
}
