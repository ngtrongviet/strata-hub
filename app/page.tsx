import Image from 'next/image'
import { Card } from '@/app/components/ui/Card'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="max-w-full bg-white">
      {/* Hero Section */}
      <div className="relative h-[66vh] w-full">
        <Image
          src="/images/strata-management.jpg"
          alt="Strata Management"
          fill
          priority
          className="w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/60 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-xl">
              <p className="text-6xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                StrataHub
              </p>
              <p className="text-xl sm:text-2xl text-white drop-shadow-lg mb-4">
                A comprehensive online platform for strata committees in New South Wales.
              </p>
              <p className="text-lg text-white/90 drop-shadow-lg">
                Streamline your strata management with digital tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* New Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-600 mb-2">Active Requests</h3>
            <p className="text-3xl font-bold text-sky-500">5</p>
            <p className="text-sm text-slate-500 mt-1">Maintenance issues</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-600 mb-2">Next Meeting</h3>
            <p className="text-3xl font-bold text-sky-500">Mar 15</p>
            <p className="text-sm text-slate-500 mt-1">Committee Meeting</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-600 mb-2">Total Units</h3>
            <p className="text-3xl font-bold text-sky-500">24</p>
            <p className="text-sm text-slate-500 mt-1">In the building</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-600 mb-2">Notices</h3>
            <p className="text-3xl font-bold text-sky-500">2</p>
            <p className="text-sm text-slate-500 mt-1">New announcements</p>
          </div>
        </div>

        {/* Recent Activities & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-sky-600 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-sky-500 pl-4">
                <p className="text-slate-900 font-medium">New Maintenance Request</p>
                <p className="text-slate-500 text-sm">Unit 301 reported plumbing issue</p>
                <p className="text-slate-400 text-sm">2 hours ago</p>
              </div>
              <div className="border-l-4 border-sky-500 pl-4">
                <p className="text-slate-900 font-medium">Document Updated</p>
                <p className="text-slate-500 text-sm">Building Insurance Policy renewed</p>
                <p className="text-slate-400 text-sm">1 day ago</p>
              </div>
              <div className="border-l-4 border-sky-500 pl-4">
                <p className="text-slate-900 font-medium">Meeting Minutes Added</p>
                <p className="text-slate-500 text-sm">February Committee Meeting</p>
                <p className="text-slate-400 text-sm">2 days ago</p>
              </div>
            </div>
            <Link href="/activities" className="text-sky-600 hover:text-sky-700 text-sm mt-4 inline-block">
              View all activities →
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-sky-600 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 rounded p-2 text-center min-w-[60px]">
                  <p className="text-sky-600 font-bold">MAR</p>
                  <p className="text-sky-800">15</p>
                </div>
                <div>
                  <p className="text-slate-900 font-medium">Committee Meeting</p>
                  <p className="text-slate-500 text-sm">7:00 PM - Common Room</p>
                  <p className="text-slate-500 text-sm">Agenda: Budget Review</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 rounded p-2 text-center min-w-[60px]">
                  <p className="text-sky-600 font-bold">MAR</p>
                  <p className="text-sky-800">20</p>
                </div>
                <div>
                  <p className="text-slate-900 font-medium">Building Inspection</p>
                  <p className="text-slate-500 text-sm">9:00 AM - All Floors</p>
                  <p className="text-slate-500 text-sm">Annual Safety Check</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 rounded p-2 text-center min-w-[60px]">
                  <p className="text-sky-600 font-bold">APR</p>
                  <p className="text-sky-800">01</p>
                </div>
                <div>
                  <p className="text-slate-900 font-medium">Quarterly Levy Due</p>
                  <p className="text-slate-500 text-sm">Q2 2024 Payment Deadline</p>
                </div>
              </div>
            </div>
            <Link href="/calendar" className="text-sky-600 hover:text-sky-700 text-sm mt-4 inline-block">
              View full calendar →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-sky-600 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/maintenance/new"
              className="flex items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              <div>
                <h3 className="font-medium text-sky-900">Report Issue</h3>
                <p className="text-sm text-sky-600">Submit maintenance request</p>
              </div>
            </Link>
            <Link 
              href="/documents"
              className="flex items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              <div>
                <h3 className="font-medium text-sky-900">Documents</h3>
                <p className="text-sm text-sky-600">Access important files</p>
              </div>
            </Link>
            <Link 
              href="/contact"
              className="flex items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              <div>
                <h3 className="font-medium text-sky-900">Contact Us</h3>
                <p className="text-sm text-sky-600">Get in touch</p>
              </div>
            </Link>
            <Link 
              href="/strata-roll"
              className="flex items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              <div>
                <h3 className="font-medium text-sky-900">Strata Roll</h3>
                <p className="text-sm text-sky-600">View unit details</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}