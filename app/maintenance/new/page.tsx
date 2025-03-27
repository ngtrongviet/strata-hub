'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface MaintenanceRequest {
  issueType: string
  priority: string
  description: string
  location: string
  images?: FileList
}

export default function NewMaintenanceRequest() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<MaintenanceRequest>({
    issueType: '',
    priority: 'medium',
    description: '',
    location: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/maintenance/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/maintenance?success=true')
      } else {
        throw new Error('Failed to submit request')
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">New Maintenance Request</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Issue Type
          </label>
          <select
            value={formData.issueType}
            onChange={(e) => setFormData({...formData, issueType: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select type...</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="structural">Structural</option>
            <option value="elevator">Elevator</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Add other form fields */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
} 