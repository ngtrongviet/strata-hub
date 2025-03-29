import Image from 'next/image'
import { Card } from '@/app/components/ui/Card'

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

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Maintenance Requests"
            value="5"
            description="Active requests"
            link="/maintenance"
          />
          <Card
            title="Next Meeting"
            value="Dec 15"
            description="Annual General Meeting"
            link="/meetings"
          />
          <Card
            title="Recent Documents"
            value="3"
            description="New uploads this week"
            link="/documents"
          />
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-sky-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-sky-600 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Document Management
              </h3>
              <p className="text-gray-600">
                Secure storage and easy access to important strata documents, including insurance policies and building regulations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Maintenance Tracking
              </h3>
              <p className="text-gray-600">
                Submit and track maintenance requests, with real-time updates on work progress.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Communication Hub
              </h3>
              <p className="text-gray-600">
                Direct communication channel between residents and building management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}