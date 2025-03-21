import { ArrowLeftIcon, DocumentIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const documents = [
  {
    category: 'Insurance',
    items: [
      { name: 'Building Insurance Certificate', path: '/docs/insurance/building-2024.pdf' },
      { name: 'Public Liability Insurance', path: '/docs/insurance/liability-2024.pdf' },
      { name: 'Workers Compensation', path: '/docs/insurance/workers-comp-2024.pdf' }
    ]
  },
  {
    category: 'Financial Reports',
    items: [
      { name: 'Annual Financial Statement 2023', path: '/docs/financial/annual-2023.pdf' },
      { name: 'Quarterly Report Q1 2024', path: '/docs/financial/q1-2024.pdf' },
      { name: 'Budget 2024', path: '/docs/financial/budget-2024.pdf' }
    ]
  },
  {
    category: 'Meeting Minutes',
    items: [
      { name: 'AGM Minutes 2023', path: '/docs/minutes/agm-2023.pdf' },
      { name: 'Committee Meeting - March 2024', path: '/docs/minutes/committee-mar-2024.pdf' },
      { name: 'Committee Meeting - February 2024', path: '/docs/minutes/committee-feb-2024.pdf' }
    ]
  },
  {
    category: 'By-Laws',
    items: [
      { name: 'Consolidated By-Laws', path: '/docs/bylaws/consolidated-2024.pdf' },
      { name: 'Pet Policy', path: '/docs/bylaws/pet-policy.pdf' },
      { name: 'Renovation Guidelines', path: '/docs/bylaws/renovation-guidelines.pdf' }
    ]
  }
]

export default function DocumentsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">Strata Documents</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="mb-6">
            Access important strata documents including insurance certificates, financial reports,
            meeting minutes, and by-laws. Some documents may require resident authentication.
          </p>

          <div className="grid gap-8">
            {documents.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                <div className="grid gap-4">
                  {category.items.map((doc, docIndex) => (
                    <div
                      key={docIndex}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <DocumentIcon className="h-6 w-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <Link
                          href={doc.path}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Download PDF
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Document Access Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Some documents require resident authentication</li>
            <li>Financial reports are updated quarterly</li>
            <li>Meeting minutes are posted within 14 days of each meeting</li>
            <li>Contact the secretary if you need historical documents not listed here</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 