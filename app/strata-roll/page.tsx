'use client'
import { useState } from 'react'

interface UnitOwner {
  unit: string
  name: string
  entitlement: number
  contact?: string
}

export default function StrataRoll() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // In a real app, this would come from your database
  const owners: UnitOwner[] = [
    { unit: '101', name: 'John Smith', entitlement: 2.5 },
    { unit: '102', name: 'Jane Doe', entitlement: 2.5 },
    // ... more owners
  ]

  const filteredOwners = owners.filter(owner => 
    owner.unit.includes(searchTerm) ||
    owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Strata Roll
        </h1>
        <div className="mt-4 md:mt-0">
          <input
            type="search"
            placeholder="Search units or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entitlement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            {filteredOwners.map((owner) => (
              <tr key={owner.unit}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {owner.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {owner.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {owner.entitlement}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 