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
    { href: '/blog', label: 'Blog' },
    { href: '/contact-us', label: 'Contact Us' }
  ]
  const pathname = usePathname()

  // About submenu state/ref
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef(null)

  // Close about submenu on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (!aboutRef.current) return
      if (!aboutRef.current.contains(e.target)) setAboutOpen(false)
    }
    function onDocKey(e) {
      if (e.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onDocKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onDocKey)
    }
  }, [])

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
          <nav className="hidden lg:flex lg:items-center lg:space-x-6" ref={aboutRef}>
            {navLinks.map((l) => {
              if (l.label === 'About Us') {
                const submenu = [
                  { href: '/about-us', label: 'About Us' },
                  { href: '/projects', label: 'Projects' },
                  { href: '#', label: 'Gallery' }
                ]

                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      aria-haspopup="menu"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen(s => !s)}
                      className={`transition inline-flex items-center gap-2 ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
                    >
                      {l.label}
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.672l3.71-3.484a.75.75 0 111.04 1.08l-4.24 3.99a.75.75 0 01-1.04 0l-4.24-3.99a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {aboutOpen && (
                      <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-40">
                        {submenu.map(si => (
                          <Link
                            key={si.href}
                            href={si.href}
                            className={`block px-4 py-2 text-sm ${isActive(si.href) ? 'text-[#DB3A06] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            {si.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-[#DB3A06] text-white rounded-md text-sm font-medium hover:bg-orange-600">Get Started</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
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
              {navLinks.map((l) => {
                if (l.label === 'About Us') {
                  const submenu = [
                    { href: '/about-us', label: 'About Us' },
                    { href: '/projects', label: 'Projects' },
                    { href: '#', label: 'Gallery' }
                  ]

                  return (
                    <div key={l.href}>
                      <button
                        onClick={() => setAboutOpen(s => !s)}
                        className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700'}`}
                      >
                        {l.label}
                      </button>
                      {aboutOpen && (
                        <div className="pl-4 mt-1 flex flex-col gap-1">
                          {submenu.map(si => (
                            <Link key={si.href} href={si.href} onClick={() => setOpen(false)} className={`block px-3 py-2 rounded-md ${isActive(si.href) ? 'text-[#DB3A06] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                              {si.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-gray-50 ${isActive(l.href) ? 'text-[#DB3A06] font-semibold' : 'text-gray-700'}`}
                  >
                    {l.label}
                  </Link>
                )
              })}
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
