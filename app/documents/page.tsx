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
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-white mb-2">
          Document Repository
        </h1>
        <p className="text-blue-400 dark:text-blue-200">
          Access and download important strata documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Document */}
        <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">
            Insurance Documents
          </h3>
          <p className="text-sm text-blue-500 dark:text-blue-200 mb-4">
            Building insurance policy and related documents
          </p>
          <a 
            href="/documents/building-insurance-pds.pdf" 
            download
            className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
          >
            Download Insurance Document
          </a>
        </div>

        {/* Building Rules Document */}
        <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">
            Building Rules & Regulations
          </h3>
          <p className="text-sm text-blue-500 dark:text-blue-200 mb-4">
            Strata by-laws and building rules
          </p>
          <a 
            href="/documents/STRATA SCHEMES MANAGEMENT ACT 2015.rtf" 
            download
            className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
          >
            Download Rules Document
          </a>
        </div>
      </div>
    </div>
  )
} 