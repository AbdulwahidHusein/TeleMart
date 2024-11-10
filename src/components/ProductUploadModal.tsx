'use client'

import { useState } from 'react'
import { X, Plus, Upload, ChevronDown } from 'lucide-react'

export default function UploadDialog({ onCancel, onSubmit }: { onCancel: () => void; onSubmit: (data: FormData) => void }) {
  const predefinedFields = [
    'SKU', 'Weight', 'Brand', 'Category', 'Color', 'Size', 'Material', 'Stock Quantity', 'Manufacturer', 'Shipping Cost',
    'Warranty', 'Discount', 'Tax', 'Expiration Date', 'Product Code', 'Discount Type', 'Location', 'Product Condition',
    'Product Rating', 'Featured'
  ]

  const [additionalFields, setAdditionalFields] = useState<{ name: string; value: string }[]>([])
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<FileList | null>(null)
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const handleAddField = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleFieldSelect = (field: string) => {
    setAdditionalFields([...additionalFields, { name: field, value: '' }])
    setDropdownVisible(false)
  }

  const handleFieldChange = (index: number, type: 'name' | 'value', value: string) => {
    const newFields = [...additionalFields]
    newFields[index][type] = value
    setAdditionalFields(newFields)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('price', price)
    formData.append('description', description)
    if (images) {
      Array.from(images).forEach((file, index) => {
        formData.append(`images[${index}]`, file)
      })
    }
    additionalFields.forEach((field, index) => {
      formData.append(`additionalFields[${index}][name]`, field.name)
      formData.append(`additionalFields[${index}][value]`, field.value)
    })

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-black dark:text-white">Upload New Product</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-black dark:text-gray-300">Product Name</label>
              <input
                id="name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm py-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-black dark:text-gray-300">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm py-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-black dark:text-gray-300">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm py-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="images" className="block text-sm font-medium text-black dark:text-gray-300">Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="images" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload files</span>
                      <input
                        id="images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black dark:text-gray-300">Additional Fields</label>

              {additionalFields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <label htmlFor={`field-${index}`} className="block text-sm font-medium text-black dark:text-gray-300">{field.name}</label>
                  <input
                    id={`field-${index}`}
                    type="text"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm py-3"
                  />
                </div>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </button>

                {isDropdownVisible && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {predefinedFields.map((field) => (
                        <button
                          key={field}
                          onClick={() => handleFieldSelect(field)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                          role="menuitem"
                        >
                          {field}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
