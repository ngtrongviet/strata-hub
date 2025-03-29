'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Document {
  id: string
  name: string
  category: 'insurance' | 'rules'
  uploadDate: string
  size: string
  type: string
}

interface UploadStatus {
  isUploading: boolean
  success?: boolean
  error?: string
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Building Insurance Policy 2024',
    category: 'insurance',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    type: 'PDF'
  },
  {
    id: '2',
    name: 'Public Liability Insurance',
    category: 'insurance',
    uploadDate: '2024-01-15',
    size: '1.8 MB',
    type: 'PDF'
  },
  {
    id: '3',
    name: 'Strata By-Laws',
    category: 'rules',
    uploadDate: '2024-01-10',
    size: '1.2 MB',
    type: 'PDF'
  },
  {
    id: '4',
    name: 'Pet Policy Guidelines',
    category: 'rules',
    uploadDate: '2024-01-10',
    size: '0.8 MB',
    type: 'PDF'
  }
]

export default function Documents() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ isUploading: false })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState<string>('insurance')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploadStatus({ isUploading: true })

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('category', category)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      setUploadStatus({ isUploading: false, success: true })
      setSelectedFile(null)
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      setUploadStatus({ 
        isUploading: false, 
        error: 'Failed to upload document. Please try again.' 
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sky-600 mb-2">
          Document Repository
        </h1>
        <p className="text-slate-600">
          Access and manage important strata documents
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-8 bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-sky-600 mb-4">
          Upload New Document
        </h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="insurance">Insurance Documents</option>
              <option value="rules">Building Rules & Regulations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Document File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <p className="mt-1 text-sm text-slate-500">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          <button
            type="submit"
            disabled={!selectedFile || uploadStatus.isUploading}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-sky-300"
          >
            {uploadStatus.isUploading ? 'Uploading...' : 'Upload Document'}
          </button>

          {uploadStatus.success && (
            <p className="text-green-600 mt-2">Document uploaded successfully!</p>
          )}
          {uploadStatus.error && (
            <p className="text-red-600 mt-2">{uploadStatus.error}</p>
          )}
        </form>
      </div>

      {/* Existing Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Document */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">
            Insurance Documents
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Building insurance policy and related documents
          </p>
          <a 
            href="/documents/insurance.pdf" 
            download
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Download Insurance Document
          </a>
        </div>

        {/* Building Rules Document */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">
            Building Rules & Regulations
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Strata by-laws and building rules
          </p>
          <a 
            href="/documents/rules.pdf" 
            download
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Download Rules Document
          </a>
        </div>
      </div>
    </div>
  )
} 