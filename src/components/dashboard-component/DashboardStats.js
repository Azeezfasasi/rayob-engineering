"use client"
import React, { useEffect, useState } from 'react'

// Client-only last updated time to prevent hydration mismatch
function LastUpdated() {
  const [now, setNow] = useState(() => new Date().toLocaleString());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().toLocaleString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return <p className="text-sm text-gray-500">Last updated: <time>{now}</time></p>;
}

function Icon({ name }) {
  switch (name) {
    case 'users':
      return (
        <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'blogs':
      return (
        <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      )
    case 'contacts':
      return (
        <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 8V7l-3 2-2-1-3 2V7L3 12v6a2 2 0 002 2h14a2 2 0 002-2v-8z" />
        </svg>
      )
    case 'quotes':
      return (
        <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h6" />
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
        </svg>
      )
    case 'projects':
      return (
        <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      )
    case 'requests':
      return (
        <svg className="w-6 h-6 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
        </svg>
      )
    default:
      return null
  }
}

function Count({ value = 0, duration = 800 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const from = display
    const to = Number(value) || 0

    function step(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOutQuad-like
      const current = Math.round(from + (to - from) * eased)
      setDisplay(current)
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span className="text-2xl md:text-3xl font-bold text-gray-900">{display.toLocaleString()}</span>
}

export default function DashboardStats({ data = {} }) {
  // default sample values if not provided
  const defaults = {
    users: 1248,
    blogs: 86,
    contacts: 321,
    quotes: 54,
    projects: 72,
    requests: 12
  }

  const stats = { ...defaults, ...data }

  const items = [
    { key: 'users', label: 'Users', value: stats.users, icon: 'users' },
    { key: 'blogs', label: 'Blogs', value: stats.blogs, icon: 'blogs' },
    { key: 'contacts', label: 'Contact Responses', value: stats.contacts, icon: 'contacts' },
    { key: 'quotes', label: 'Submitted Quotes', value: stats.quotes, icon: 'quotes' },
    { key: 'projects', label: 'Projects', value: stats.projects, icon: 'projects' },
    { key: 'requests', label: 'Open Requests', value: stats.requests, icon: 'requests' }
  ]

  return (
    <section aria-labelledby="dashboard-stats" className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 id="dashboard-stats" className="text-lg font-semibold text-gray-800">Overview</h2>
        <LastUpdated />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.key} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4">
            <div className="shrink-0"> <Icon name={item.icon} /> </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="text-xs font-medium text-gray-500">{item.label}</div>
                  <div className="mt-1"><Count value={item.value} /></div>
                </div>
                {/* placeholder for small delta or sparkline */}
                <div className="text-right text-xs text-gray-400">&nbsp;</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
