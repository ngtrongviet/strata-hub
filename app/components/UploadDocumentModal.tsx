'use client'
import { useState } from 'react'

interface UploadDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File, category: string) => void
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
  onUpload
}: UploadDocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState('insurance')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFile) {
      onUpload(selectedFile, category)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-blue-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">
          Upload Document
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="insurance">Insurance Documents</option>
              <option value="rules">Rules & Regulations</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              File
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={!selectedFile}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 