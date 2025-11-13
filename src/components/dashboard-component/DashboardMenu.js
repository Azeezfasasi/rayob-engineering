"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Icon({ name }) {
  switch (name) {
    case 'dashboard':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
        </svg>
      )
    case 'projects':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      )
    case 'blog':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      )
    case 'settings':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 15.5A3.5 3.5 0 1012 8.5a3.5 3.5 0 000 7z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.5 7.5 0 00.6-2.5 7.5 7.5 0 00-.6-2.5l2.1-1.6-1.8-3.1-2.5 1a8 8 0 00-2.2-1.3L14.6 1h-4l-.9 4.1a7.9 7.9 0 00-2.2 1.3l-2.5-1L2.9 8.4 5 10a7.5 7.5 0 000 5l-2.1 1.6 1.8 3.1 2.5-1c.6.5 1.3.9 2.2 1.3L10.6 23h4l.9-4.1c.8-.3 1.6-.8 2.2-1.3l2.5 1 1.8-3.1L19.4 15z" />
        </svg>
      )
    default:
      return null
  }
}

export default function DashboardMenu({ collapsed }) {
  const pathname = usePathname() || ''
  const items = [
    { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { href: '/dashboard/projects', label: 'Projects', icon: 'projects' },
    { href: '/blog', label: 'Blog', icon: 'blog' },
    { href: '/dashboard/settings', label: 'Settings', icon: 'settings' }
  ]

  return (
    <nav className={`h-full bg-white border-r border-gray-100 ${collapsed ? 'w-16' : 'w-64'} transition-width duration-200`} aria-label="Dashboard navigation">
      <div className="h-full overflow-y-auto py-6 px-2">
        <ul className="space-y-1">
          {items.map(i => {
            const active = pathname === i.href || pathname.startsWith(i.href + '/')
            return (
              <li key={i.href}>
                <Link href={i.href} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <span className="shrink-0 text-gray-500"> <Icon name={i.icon} /> </span>
                  {!collapsed && <span className="text-sm font-medium">{i.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
