'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function NewMaintenanceRequest() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low')
  const [files, setFiles] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        router.push('/auth/sign-in')
      }
    }
    checkAuth()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Get the current user's session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        throw new Error('You must be logged in to create a maintenance request')
      }

      // Create the maintenance request
      const { data: request, error: requestError } = await supabase
        .from('maintenance_requests')
        .insert([
          {
            title,
            description,
            location,
            urgency,
            status: 'Pending',
            requested_by: session.user.id
          },
        ])
        .select()
        .single()

      if (requestError) {
        console.error('Request error:', requestError)
        throw new Error(requestError.message)
      }

      if (!request) {
        throw new Error('Failed to create request')
      }

      // Handle file uploads if any
      if (files && files.length > 0) {
        const uploadPromises = Array.from(files).map(async (file) => {
          try {
            // Validate file size (e.g., 5MB limit)
            const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
            if (file.size > MAX_FILE_SIZE) {
              throw new Error(`File ${file.name} is too large. Maximum size is 5MB.`)
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
            if (!allowedTypes.includes(file.type)) {
              throw new Error(`File ${file.name} has unsupported format. Allowed formats: JPG, PNG, GIF, PDF`)
            }

            // Create a unique file name
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${request.id}/${fileName}`

            // Upload file
            const { error: uploadError, data: uploadData } = await supabase.storage
              .from('maintenance-attachments')
              .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
              })

            if (uploadError) {
              throw uploadError
            }

            // Create attachment record
            const { error: attachmentError } = await supabase
              .from('maintenance_attachments')
              .insert([
                {
                  request_id: request.id,
                  file_name: file.name,
                  file_path: filePath,
                  file_type: file.type,
                  uploaded_by: session.user.id
                },
              ])

            if (attachmentError) {
              throw attachmentError
            }

            return { success: true, fileName: file.name }
          } catch (error) {
            return { 
              success: false, 
              fileName: file.name, 
              error: error instanceof Error ? error.message : 'Upload failed' 
            }
          }
        })

        // Wait for all uploads to complete
        const uploadResults = await Promise.all(uploadPromises)
        
        // Check for any upload failures
        const failures = uploadResults.filter(result => !result.success)
        if (failures.length > 0) {
          setError(`Some files failed to upload: ${failures.map(f => f.fileName).join(', ')}`)
        }
      }

      router.push('/maintenance')
      router.refresh()
    } catch (error) {
      console.error('Error details:', error)
      setError(error instanceof Error ? error.message : 'Failed to create maintenance request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-sky-600 mb-8">
        New Maintenance Request
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Brief description of the issue"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Detailed description of the maintenance issue"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="e.g., Unit 101, Common Area, Pool"
          />
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-slate-700">
            Urgency
          </label>
          <select
            id="urgency"
            required
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as 'Low' | 'Medium' | 'High' | 'Critical')}
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label htmlFor="attachments" className="block text-sm font-medium text-slate-700">
            Attachments
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            accept="image/jpeg,image/png,image/gif,application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
          />
          <p className="mt-1 text-sm text-slate-500">
            Accepted formats: JPG, PNG, GIF, PDF. Maximum size: 5MB per file.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/maintenance')}
            className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </div>
      </form>
    </div>
  )
} 