"use client"
import React, { useState } from 'react'
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

export default function DashboardMenu({ collapsed, mobileOpen = false, onClose = () => {} }) {
  const pathname = usePathname() || ''
  const items = [
    { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
    {
      href: '/dashboard/projects',
      label: 'Projects',
      icon: 'projects',
      children: [
        { href: '/dashboard/add-projects', label: 'Add Project' },
        { href: '/dashboard/all-projects', label: 'All Projects' }
      ]
    },
    {
      href: '/dashboard/blog',
      label: 'Blog',
      icon: 'blog',
      children: [
        { href: '/dashboard/add-blog', label: 'Add Blog' },
        { href: '/dashboard/manage-blog', label: 'Manage Blogs' }
      ]
    },
    { href: '/dashboard/contact-form-responses', label: 'Contact Form Responses', icon: 'dashboard' },
    { href: '/dashboard/quote-requests', label: 'Quote Requests', icon: 'dashboard' },
    {
      href: '/dashboard/all-users',
      label: 'Manage Users',
      icon: 'blog',
      children: [
        { href: '/dashboard/all-users', label: 'All Users' },
        { href: '/dashboard/add-user', label: 'Add User' },
        { href: '/dashboard/change-user-password', label: 'Change User Password' }
      ]
    },
    {
      href: '/dashboard/all-newsletter',
      label: 'Newsletter Management',
      icon: 'blog',
      children: [
        { href: '/dashboard/send-newsletter', label: 'Send Newsletter' },
        { href: '/dashboard/all-newsletters', label: 'All Newsletters' },
        { href: '/dashboard/subscribers', label: 'Subscribers' },
      ]
    },
    {
      href: '/dashboard/all-gallery',
      label: 'Gallery Management',
      icon: 'blog',
      children: [
        { href: '/dashboard/add-gallery', label: 'Add Gallery' },
        { href: '/dashboard/all-gallery', label: 'All Gallery' },
      ]
    },
    {
      href: '#',
      label: 'Homepage Settings',
      icon: 'blog',
      children: [
        { href: '/dashboard/homepage/hero', label: 'Hero Section' },
        { href: '#', label: 'Call to Action' },
        { href: '#', label: 'Our Services' },
        { href: '#', label: 'Testimonial' },
      ]
    },
    {
      href: '#',
      label: 'About Page Settings',
      icon: 'blog',
      children: [
        { href: '#', label: 'Mission & Vision' },
        { href: '#', label: 'History & Milestones' },
        { href: '#', label: 'Team Members' },
        { href: '#', label: 'Testimonial' },
      ]
    },
  ]

  const [openKey, setOpenKey] = useState(null)

  function toggleSub(key) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  // Desktop / large screens: persistent sidebar
  const desktopNav = (
    <nav className={`hidden md:flex h-full bg-white border-r border-gray-100 ${collapsed ? 'w-16' : 'w-64'} transition-width duration-200`} aria-label="Dashboard navigation">
      <div className="h-full overflow-y-auto py-6 px-2">
        <ul className="space-y-1">
          {items.map(i => {
            const active = pathname === i.href || pathname.startsWith(i.href + '/')
            const hasChildren = Array.isArray(i.children) && i.children.length > 0
            const isOpen = openKey === i.href

            return (
              <li key={i.href}>
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleSub(i.href)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="shrink-0 text-gray-500"> <Icon name={i.icon} /> </span>
                        {!collapsed && <span className="text-sm font-medium">{i.label}</span>}
                      </span>
                      {!collapsed && (
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l6 4-6 4V6z" />
                        </svg>
                      )}
                    </button>

                    {/* Submenu (desktop) */}
                    {!collapsed && isOpen && (
                      <ul className="mt-1 space-y-1 pl-10">
                        {i.children.map(c => (
                          <li key={c.href}>
                            <Link href={c.href} className={`block px-3 py-2 rounded-md text-sm ${pathname === c.href ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={i.href} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <span className="shrink-0 text-gray-500"> <Icon name={i.icon} /> </span>
                    {!collapsed && <span className="text-sm font-medium">{i.label}</span>}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )

  // Mobile overlay nav: only visible when mobileOpen is true
  const mobileNav = mobileOpen ? (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <nav className="relative z-50 h-full w-64 bg-white border-r border-gray-100">
        <div className="h-full overflow-y-auto py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-orange-400 to-red-500 rounded-md flex items-center justify-center text-white font-bold">R</div>
              <span className="text-lg font-semibold text-gray-800">Dashboard</span>
            </Link>
            <button aria-label="Close menu" onClick={onClose} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-1">
              {items.map(i => {
                const active = pathname === i.href || pathname.startsWith(i.href + '/')
                const hasChildren = Array.isArray(i.children) && i.children.length > 0
                const isOpen = openKey === i.href

                return (
                  <li key={i.href}>
                    {hasChildren ? (
                      <div>
                        <button onClick={() => toggleSub(i.href)} className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                          <span className="flex items-center gap-3">
                            <span className="shrink-0 text-gray-500"> <Icon name={i.icon} /> </span>
                            <span className="text-sm font-medium">{i.label}</span>
                          </span>
                          <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l6 4-6 4V6z" />
                          </svg>
                        </button>

                        {/* Mobile submenu accordion */}
                        {isOpen && (
                          <ul className="mt-1 space-y-1 pl-6">
                            {i.children.map(c => (
                              <li key={c.href}>
                                <Link href={c.href} onClick={onClose} className={`block px-3 py-2 rounded-md text-sm ${pathname === c.href ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link href={i.href} onClick={onClose} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <span className="shrink-0 text-gray-500"> <Icon name={i.icon} /> </span>
                        <span className="text-sm font-medium">{i.label}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
          </ul>
        </div>
      </nav>
    </div>
  ) : null

  return (
    <>
      {desktopNav}
      {mobileNav}
    </>
  )
}
