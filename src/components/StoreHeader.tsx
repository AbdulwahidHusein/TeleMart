import { AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoMdListBox } from 'react-icons/io'

interface StoreHeaderProps {
  onUploadProduct: () => void
  onViewOrders: () => void
}

const StoreHeader = ({ onUploadProduct, onViewOrders }: StoreHeaderProps) => (
  <div className="fixed inset-y-0 right-0 flex flex-col items-center p-4 space-y-4 bg-white dark:bg-gray-800 shadow-lg z-10">
    <button
      onClick={onUploadProduct}
      className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      <AiOutlinePlus size={24} />
    </button>
    <button
      onClick={onViewOrders}
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
)

export default StoreHeader
