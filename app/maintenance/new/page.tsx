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
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you'd upload the files and submit the form data
      const response = await fetch('/api/maintenance/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/maintenance?success=true')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-sky-600 mb-6">
        New Maintenance Request
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Attachments (Photos)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(e.target.files)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <p className="mt-1 text-sm text-slate-500">
              You can upload multiple photos (max 5MB each)
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors disabled:bg-sky-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  )
} 