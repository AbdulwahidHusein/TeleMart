import Image from 'next/image'
import { Product } from '@/types/Product'

interface ProductCardProps {
  item: Product
  onViewDetails: () => void
}

const AdminProductCard = ({ item, onViewDetails }: ProductCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h2>
      <Image
        src={item.images[0]}
        alt={item.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover mb-4"
      />
      <p className="text-lg font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</p>
    </div>
    <div className="px-4 pb-4">
      <button
        onClick={onViewDetails}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
)

export default AdminProductCard
