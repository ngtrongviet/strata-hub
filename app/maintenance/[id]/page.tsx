'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

type MaintenanceRequest = {
  id: string
  title: string
  description: string
  location: string
  urgency: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Pending' | 'In Progress' | 'Resolved'
  created_at: string
  estimated_cost: number | null
  deadline: string | null
  completed_at: string | null
  completion_notes: string | null
  requested_by: string
}

type Attachment = {
  id: string
  file_name: string
  file_path: string
  file_type: string
}

export default function MaintenanceRequestDetail() {
  const params = useParams()
  const requestId = params?.id as string
  const [request, setRequest] = useState<MaintenanceRequest | null>(null)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [completionNotes, setCompletionNotes] = useState('')
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({})
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (requestId) {
      fetchRequestDetails()
    }
  }, [requestId])

  const fetchRequestDetails = async () => {
    try {
      // Fetch request details
      const { data: request, error: requestError } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('id', requestId)
        .single()

      if (requestError) throw requestError

      setRequest(request)
      setCompletionNotes(request.completion_notes || '')

      // Fetch attachments
      const { data: attachments, error: attachmentsError } = await supabase
        .from('maintenance_attachments')
        .select('*')
        .eq('request_id', requestId)

      if (attachmentsError) throw attachmentsError

      setAttachments(attachments || [])

      // Get URLs for images
      if (attachments) {
        const urls: { [key: string]: string } = {}
        for (const attachment of attachments) {
          if (attachment.file_type.startsWith('image/')) {
            const { data } = await supabase.storage
              .from('maintenance-attachments')
              .createSignedUrl(attachment.file_path, 3600)

            if (data?.signedUrl) {
              urls[attachment.id] = data.signedUrl
            }
          }
        }
        setImageUrls(urls)
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to load request details')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (newStatus: 'Pending' | 'In Progress' | 'Resolved') => {
    setIsUpdating(true)
    try {
      const updates: any = {
        status: newStatus,
      }

      if (newStatus === 'Resolved') {
        updates.completed_at = new Date().toISOString()
        updates.completion_notes = completionNotes
      }

      const { error } = await supabase
        .from('maintenance_requests')
        .update(updates)
        .eq('id', requestId)

      if (error) throw error

      setRequest(prev => prev ? { ...prev, ...updates } : null)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error || 'Request not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-sky-600 mb-2">
            {request.title}
          </h1>
          <div className="flex space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
              {request.urgency}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          {request.status !== 'Resolved' && (
            <>
              <button
                onClick={() => handleStatusUpdate('In Progress')}
                disabled={isUpdating || request.status === 'In Progress'}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleStatusUpdate('Resolved')}
                disabled={isUpdating}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                Mark Resolved
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
            <p className="text-slate-600">{request.description}</p>
          </div>

          {request.status === 'Resolved' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Completion Notes</h2>
              <p className="text-slate-600">{request.completion_notes || 'No completion notes provided.'}</p>
            </div>
          )}

          {request.status !== 'Resolved' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Completion Notes</h2>
              <textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
                rows={4}
                placeholder="Add notes about the resolution..."
              />
            </div>
          )}

          {attachments.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Attachments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="relative">
                    {attachment.file_type.startsWith('image/') ? (
                      <a
                        href={imageUrls[attachment.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="aspect-w-16 aspect-h-9 relative">
                          <Image
                            src={imageUrls[attachment.id]}
                            alt={attachment.file_name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </a>
                    ) : (
                      <a
                        href={imageUrls[attachment.id]}
                        download={attachment.file_name}
                        className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                      >
                        {attachment.file_name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Location</dt>
                <dd className="mt-1 text-slate-900">{request.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Created</dt>
                <dd className="mt-1 text-slate-900">
                  {new Date(request.created_at).toLocaleDateString()}
                </dd>
              </div>
              {request.estimated_cost && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">Estimated Cost</dt>
                  <dd className="mt-1 text-slate-900">${request.estimated_cost}</dd>
                </div>
              )}
              {request.deadline && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">Deadline</dt>
                  <dd className="mt-1 text-slate-900">
                    {new Date(request.deadline).toLocaleDateString()}
                  </dd>
                </div>
              )}
              {request.completed_at && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">Completed</dt>
                  <dd className="mt-1 text-slate-900">
                    {new Date(request.completed_at).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
} 