'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface MaintenanceRequest {
  id: string
  issueType: string
  priority: string
  description: string
  location: string
  status: 'pending' | 'in_progress' | 'completed'
  submittedAt: string
  updatedAt: string
}

// Format date consistently
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Move example data outside the component
const exampleRequests: MaintenanceRequest[] = [
  {
    id: '1',
    issueType: 'electrical',
    priority: 'urgent',
    description: 'Power outage in common area',
    location: 'Ground Floor Lobby',
    status: 'in_progress',
    submittedAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T14:20:00Z'
  },
  {
    id: '2',
    issueType: 'plumbing',
    priority: 'medium',
    description: 'Leaking tap in common bathroom',
    location: 'Level 2 Common Bathroom',
    status: 'pending',
    submittedAt: '2024-03-14T09:15:00Z',
    updatedAt: '2024-03-14T09:15:00Z'
  }
]

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  // Add client-side only state for rendered
  const [isClient, setIsClient] = useState(false)
  
  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])
  
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
          <p className="text-3xl font-bold text-sky-500">3</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-sky-500">2</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-sky-500">8</p>
        </div>
      </div>

      {/* Request List */}
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

        <div className="divide-y divide-gray-200 dark:divide-blue-700">
          {isClient && exampleRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
                  {request.issueType.charAt(0).toUpperCase() + request.issueType.slice(1)} Issue
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{request.description}</p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Location: {request.location}</span>
                <span>Priority: {request.priority.toUpperCase()}</span>
                <span>Submitted: {formatDate(request.submittedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show loading state while client-side rendering isn't ready */}
      {!isClient && (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      )}
    </div>
  )
} 