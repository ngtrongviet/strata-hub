'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
}

type Attachment = {
  id: string
  file_name: string
  file_path: string
  file_type: string
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [pendingCount, setPendingCount] = useState(0)
  const [inProgressCount, setInProgressCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)

  const fetchRequests = async () => {
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      
      if (authError) throw authError
      
      if (!session) {
        router.push('/auth/sign-in')
        return
      }

      // Fetch all requests to get accurate counts
      const { data: allRequests, error: requestError } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('requested_by', session.user.id)

      if (requestError) throw requestError

      // Set all requests for counting
      const allRequestsArray = allRequests || []

      // Fetch filtered requests based on active tab
      const { data: filteredRequests, error: filterError } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('requested_by', session.user.id)
        .in('status', activeTab === 'active' ? ['Pending', 'In Progress'] : ['Resolved'])
        .order('created_at', { ascending: false })

      if (filterError) throw filterError

      // Set the filtered requests for display
      setRequests(filteredRequests || [])

      // Update counts in state if needed
      setPendingCount(allRequestsArray.filter(r => r.status === 'Pending').length)
      setInProgressCount(allRequestsArray.filter(r => r.status === 'In Progress').length)
      setResolvedCount(allRequestsArray.filter(r => r.status === 'Resolved').length)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to load maintenance requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [activeTab, supabase, router])

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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-sky-600 mb-2">
            Maintenance Requests
          </h1>
          <p className="text-slate-600">
            Submit and track maintenance requests
          </p>
        </div>
        <Link
          href="/maintenance/new"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          New Request
        </Link>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-sky-500">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-sky-500">
            {inProgressCount}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Resolved</h3>
          <p className="text-3xl font-bold text-sky-500">
            {resolvedCount}
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'active'
                  ? 'border-b-2 border-sky-500 text-sky-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Active Requests
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'completed'
                  ? 'border-b-2 border-sky-500 text-sky-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Completed
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No maintenance requests found
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/maintenance/${request.id}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    {request.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{request.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Location: {request.location}</span>
                  <span>
                    Created: {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 