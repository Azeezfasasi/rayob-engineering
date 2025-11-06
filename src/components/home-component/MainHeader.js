"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainHeader() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  // Close on Escape or click outside
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClick(e) {
      if (!panelRef.current || !btnRef.current) return
      if (open && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/request-a-quote', label: 'Request a Quote' },
    { href: '/contact-us', label: 'Contact Us' }
  ]
  const pathname = usePathname()

  const isActive = (href) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/') || pathname.startsWith(href)
  }

  return (
    <>
    <header className="w-full bg-white/60 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">R</div>
              <span className="text-lg font-semibold text-gray-800">Rayob</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-[#DB3A06] text-white rounded-md text-sm font-medium hover:bg-orange-600">Get Started</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              ref={btnRef}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="relative z-20 flex items-center justify-center w-11 h-11 rounded-lg bg-white/70 backdrop-blur border border-gray-100 shadow-sm"
            >
              <span className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ${open ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 mt-1 transform transition duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 mt-1 transform transition duration-300 ${open ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'}`}></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile panel (render only when open) */}
    {open && (
      <div ref={panelRef} className="fixed inset-0 z-10" aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}></div>

        <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-linear-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">R</div>
                <span className="font-semibold text-gray-800">Rayob</span>
              </Link>
              <button onClick={() => setOpen(false)} className="text-gray-600">✕</button>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md hover:bg-gray-50 ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700'}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-6 flex flex-col gap-3">
              <Link href="/login" onClick={() => setOpen(false)} className="block text-center text-gray-700">Login</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="block bg-[#DB3A06] text-white px-4 py-2 rounded-md text-center">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
