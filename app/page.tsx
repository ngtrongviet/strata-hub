import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Strata Management Portal</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Our Building</h2>
          <p className="mb-4">
            Welcome to our Strata-titled apartment building, governed by the Strata Schemes Management Act (2015).
            Our building is managed by an elected Strata Committee responsible for maintaining common areas,
            handling insurance, and managing administrative tasks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/committee" className="text-blue-600 hover:underline">
                    Committee Members
                  </Link>
                </li>
                <li>
                  <Link href="/maintenance" className="text-blue-600 hover:underline">
                    Maintenance Requests
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="text-blue-600 hover:underline">
                    Important Documents
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Important Information</h3>
              <ul className="space-y-2">
                <li>Building Address: 123 Strata Street, Sydney NSW 2000</li>
                <li>Emergency Contact: (02) 9999-9999</li>
                <li>Building Manager Hours: Mon-Fri 9am-5pm</li>
                <li>Next Committee Meeting: First Tuesday of every month</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 