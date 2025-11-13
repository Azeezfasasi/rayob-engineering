import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function DashboardHeader({ onToggleSidebar }) {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-orange-400 to-red-500 rounded-md flex items-center justify-center text-white font-bold">R</div>
              <span className="text-lg font-semibold text-gray-800">Dashboard</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-xl">
              <label htmlFor="dash-search" className="sr-only">Search</label>
              <div className="relative">
                <input id="dash-search" type="search" placeholder="Search projects, posts or users" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button aria-label="Notifications" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>

            <div className="relative">
              <button className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image src="/images/avatar-placeholder.png" alt="User avatar" width={32} height={32} className="object-cover" />
                </div>
                <span className="hidden sm:block text-sm text-gray-700">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
