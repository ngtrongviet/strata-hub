'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface UnitOwner {
  unit: string
  name: string
  email: string
  phone: string
  entitlement: number
  occupancyType: 'Owner Occupied' | 'Tenanted'
  lastUpdated: string
}

const unitOwners: UnitOwner[] = [
  {
    unit: '101',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '0400 123 456',
    entitlement: 2.5,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-02-15'
  },
  {
    unit: '102',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '0400 789 012',
    entitlement: 2.5,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-02-10'
  },
  {
    unit: '103',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '0400 345 678',
    entitlement: 2.5,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-02-20'
  },
  {
    unit: '104',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '0411 222 333',
    entitlement: 2.5,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-03-01'
  },
  {
    unit: '201',
    name: 'David Thompson',
    email: 'd.thompson@email.com',
    phone: '0422 333 444',
    entitlement: 3.0,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-02-28'
  },
  {
    unit: '202',
    name: 'Lisa Zhang',
    email: 'lisa.z@email.com',
    phone: '0433 444 555',
    entitlement: 3.0,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-02-25'
  },
  {
    unit: '203',
    name: 'Robert Brown',
    email: 'robert.b@email.com',
    phone: '0444 555 666',
    entitlement: 3.0,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-03-05'
  },
  {
    unit: '204',
    name: 'Maria Garcia',
    email: 'm.garcia@email.com',
    phone: '0455 666 777',
    entitlement: 3.0,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-03-02'
  },
  {
    unit: '301',
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    phone: '0466 777 888',
    entitlement: 3.5,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-02-18'
  },
  {
    unit: '302',
    name: 'Sophie Kim',
    email: 's.kim@email.com',
    phone: '0477 888 999',
    entitlement: 3.5,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-03-03'
  },
  {
    unit: '303',
    name: 'Ahmed Hassan',
    email: 'a.hassan@email.com',
    phone: '0488 999 000',
    entitlement: 3.5,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-02-22'
  },
  {
    unit: '304',
    name: 'Lucy Taylor',
    email: 'l.taylor@email.com',
    phone: '0499 000 111',
    entitlement: 3.5,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-03-04'
  },
  {
    unit: '401',
    name: 'Peter Anderson',
    email: 'p.anderson@email.com',
    phone: '0411 111 222',
    entitlement: 4.0,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-02-19'
  },
  {
    unit: '402',
    name: 'Julia Martinez',
    email: 'j.martinez@email.com',
    phone: '0422 222 333',
    entitlement: 4.0,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-03-06'
  },
  {
    unit: '403',
    name: 'Thomas Lee',
    email: 't.lee@email.com',
    phone: '0433 333 444',
    entitlement: 4.0,
    occupancyType: 'Tenanted',
    lastUpdated: '2024-02-27'
  },
  {
    unit: '404',
    name: 'Anna Kowalski',
    email: 'a.kowalski@email.com',
    phone: '0444 444 555',
    entitlement: 4.0,
    occupancyType: 'Owner Occupied',
    lastUpdated: '2024-03-01'
  }
]

export default function StrataRoll() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize search from URL parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all')

  // Update URL when search changes
  const updateSearch = (newSearch: string, newFilter: string) => {
    const params = new URLSearchParams()
    if (newSearch) params.set('search', newSearch)
    if (newFilter !== 'all') params.set('filter', newFilter)
    
    router.push(`/strata-roll?${params.toString()}`)
  }

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearch(searchTerm, filter)
  }

  const filteredOwners = unitOwners.filter(owner => {
    const matchesSearch = 
      owner.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    return matchesSearch && owner.occupancyType.toLowerCase() === filter.toLowerCase()
  })

  const totalEntitlements = unitOwners.reduce((sum, owner) => sum + owner.entitlement, 0)

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sky-600 mb-2">
          Strata Roll
        </h1>
        <p className="text-slate-600">
          Manage and view unit ownership details and contact information
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Total Units</h3>
          <p className="text-3xl font-bold text-sky-500">{unitOwners.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Owner Occupied</h3>
          <p className="text-3xl font-bold text-sky-500">
            {unitOwners.filter(o => o.occupancyType === 'Owner Occupied').length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Total Entitlements</h3>
          <p className="text-3xl font-bold text-sky-500">{totalEntitlements}%</p>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by unit number or owner name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        >
          <option value="all">All Units</option>
          <option value="owner-occupied">Owner Occupied</option>
          <option value="tenanted">Tenanted</option>
        </select>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Search
        </button>
      </form>

      {/* Display search parameters if any */}
      {(searchTerm || filter !== 'all') && (
        <div className="mb-4 p-4 bg-sky-50 rounded-lg">
          <p className="text-sky-600">
            Showing results for: 
            {searchTerm && <span className="font-medium"> "{searchTerm}"</span>}
            {filter !== 'all' && <span className="font-medium"> in {filter} units</span>}
          </p>
        </div>
      )}

      {/* Unit Owners Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Owner Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Entitlement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOwners.map((owner) => (
                <tr key={owner.unit} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sky-600">
                    {owner.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{owner.name}</div>
                    <div className="text-sm text-slate-500">Last updated: {owner.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{owner.email}</div>
                    <div className="text-sm text-slate-500">{owner.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {owner.entitlement}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      owner.occupancyType === 'Owner Occupied' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {owner.occupancyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <button className="text-sky-600 hover:text-sky-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Owner Button */}
      <div className="mt-6">
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors">
          Add New Owner
        </button>
      </div>
    </div>
  )
} 