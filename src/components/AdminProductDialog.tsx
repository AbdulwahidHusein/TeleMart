'use client';

import Image from 'next/image';
import { Product } from '@/types/Product';
import { Edit, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ProductDialogProps {
  item: Product;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminProductDialog({ item, onClose, onEdit, onDelete }: ProductDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 dark:bg-gray-800">
      <div className="w-full max-w-md max-h-[90vh] flex flex-col bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-0 relative aspect-video">
          <div
            className="absolute inset-0 flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {item.images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full relative">
                <Image
                  src={image}
                  alt={`${item.name} - Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[200px] px-6 py-4 overflow-y-auto">
          <p className="text-lg font-semibold mb-2">${item.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 border-t border-gray-200">
          <button onClick={onEdit} className="flex items-center px-4 py-2 text-gray-200 light:text-dark-200 hover:bg-gray-100 rounded">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
          <button onClick={onDelete} className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
