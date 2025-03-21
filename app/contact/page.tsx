import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const contactInfo = [
  {
    title: 'Emergency Contact',
    description: 'For urgent issues requiring immediate attention',
    contact: '(02) 9999-9999',
    availability: '24/7'
  },
  {
    title: 'Building Manager',
    description: 'For general building maintenance and access issues',
    contact: '(02) 9999-8888',
    availability: 'Monday to Friday, 9am - 5pm'
  },
  {
    title: 'Strata Manager',
    description: 'For administrative and financial matters',
    contact: 'strata@stratabuilding.com',
    availability: 'Monday to Friday, 9am - 5pm'
  }
]

const committeeContacts = [
  {
    role: 'Chairperson',
    contact: 'chair@stratabuilding.com',
    matters: 'General building management and committee matters'
  },
  {
    role: 'Secretary',
    contact: 'secretary@stratabuilding.com',
    matters: 'Meeting minutes, correspondence, and record keeping'
  },
  {
    role: 'Treasurer',
    contact: 'treasurer@stratabuilding.com',
    matters: 'Financial matters, levies, and budgets'
  }
]

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">Contact Information</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Important Contacts</h2>
          <div className="grid gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-2">{info.description}</p>
                <p className="font-medium">{info.contact}</p>
                <p className="text-sm text-gray-500">Available: {info.availability}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Committee Members</h2>
          <div className="grid gap-6">
            {committeeContacts.map((member, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                <p className="text-gray-600 mb-2">{member.matters}</p>
                <a
                  href={`mailto:${member.contact}`}
                  className="text-blue-600 hover:underline"
                >
                  {member.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>For emergencies, always call the emergency contact number first</li>
            <li>Email is preferred for non-urgent matters</li>
            <li>Allow up to 2 business days for email responses</li>
            <li>Committee meetings are held on the first Tuesday of each month</li>
            <li>Formal complaints must be submitted in writing to the Secretary</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 