'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLinks() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/documents', label: 'Documents' },
    { href: '/strata-roll', label: 'Strata Roll' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            pathname === item.href
              ? 'border-blue-500 text-blue-900 dark:text-blue-100'
              : 'border-transparent text-blue-600 hover:border-blue-300 hover:text-blue-700 dark:text-blue-300'
          } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
} 