'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface MaintenanceRequest {
  issueType: string
  priority: string
  description: string
  location: string
  unitNumber: string
  contactEmail: string
}

export default function NewMaintenanceRequest() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  // Initialize form with GET parameters if they exist
  const [formData, setFormData] = useState<MaintenanceRequest>({
    issueType: searchParams.get('type') || '',
    priority: searchParams.get('priority') || 'medium',
    description: searchParams.get('description') || '',
    location: searchParams.get('location') || '',
    unitNumber: searchParams.get('unit') || '',
    contactEmail: searchParams.get('email') || ''
  })

  // Handle form submission (POST request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/maintenance/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.status === 201) {
        // Successfully created
        router.push('/maintenance?success=true')
      } else if (response.status === 400) {
        // Bad request - validation error
        const data = await response.json()
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Please check your input and try again.' 
        })
      } else if (response.status === 401) {
        // Unauthorized
        router.push('/login?redirect=/maintenance/new')
      } else if (response.status === 429) {
        // Too many requests
        setSubmitStatus({ 
          type: 'error', 
          message: 'Too many requests. Please try again later.' 
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate URL with current form data (GET request)
  const generateShareableLink = () => {
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-sky-600 mb-6">
        New Maintenance Request
      </h1>

      {submitStatus.type && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Unit Number
            </label>
            <input
              type="text"
              required
              value={formData.unitNumber}
              onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Issue Type
            </label>
            <select
              required
              value={formData.issueType}
              onChange={(e) => setFormData({...formData, issueType: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select type...</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="structural">Structural</option>
              <option value="elevator">Elevator</option>
              <option value="hvac">HVAC</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Priority Level
            </label>
            <select
              required
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="e.g., Unit 301, Common Area, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Please describe the issue in detail..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors disabled:bg-sky-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                const link = generateShareableLink()
                navigator.clipboard.writeText(link)
                alert('Shareable link copied to clipboard!')
              }}
              className="px-4 py-3 text-sky-600 hover:text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-50"
            >
              Share Link
            </button>
          </div>
        </div>
      </form>

      {/* Instructions */}
      <div className="mt-6 bg-sky-50 rounded-lg p-4 text-sm text-sky-600">
        <h3 className="font-medium mb-2">About This Form:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use GET request to pre-fill form via URL parameters</li>
          <li>Form submits via POST request to our secure API</li>
          <li>Share link button generates a pre-filled form URL</li>
          <li>Handles various HTTP status codes (201, 400, 401, 429)</li>
          <li>Implements proper error handling and user feedback</li>
        </ul>
      </div>
    </div>
  )
} 