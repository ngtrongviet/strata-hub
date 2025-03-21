import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const committeeMembers = [
  {
    role: 'Chairperson',
    name: 'Sarah Johnson',
    email: 'chair@stratabuilding.com',
    responsibilities: 'Oversees committee meetings and general building management'
  },
  {
    role: 'Secretary',
    name: 'Michael Chen',
    email: 'secretary@stratabuilding.com',
    responsibilities: 'Handles correspondence and maintains records'
  },
  {
    role: 'Treasurer',
    name: 'David Thompson',
    email: 'treasurer@stratabuilding.com',
    responsibilities: 'Manages financial records and levy collections'
  },
  {
    role: 'Committee Member',
    name: 'Lisa Anderson',
    email: 'member1@stratabuilding.com',
    responsibilities: 'Maintenance coordination'
  },
  {
    role: 'Committee Member',
    name: 'Robert Wilson',
    email: 'member2@stratabuilding.com',
    responsibilities: 'Security and access control'
  }
]

export default function CommitteePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">Strata Committee Members</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-6">
            Our strata committee consists of elected representatives responsible for managing the building
            and making decisions on behalf of all owners. The committee meets monthly to discuss and
            resolve building matters.
          </p>

          <div className="grid gap-6">
            {committeeMembers.map((member, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-medium">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                      {member.email}
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">Responsibilities:</p>
                  <p>{member.responsibilities}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 