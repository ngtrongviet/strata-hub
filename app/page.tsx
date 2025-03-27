import { Card } from '@/app/components/ui/Card'

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Building Dashboard
      </h1>

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

      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
        {/* Add announcements list */}
      </div>
    </div>
  )
}