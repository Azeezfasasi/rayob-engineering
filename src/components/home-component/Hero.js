"use client"
import React, { useRef, useState, useEffect } from 'react'

export default function Hero() {
  const slides = [
    {
      title: 'Engineering excellence, delivered',
      subtitle: 'We design and build robust infrastructure and software solutions tailored to your needs.',
      cta: { label: 'Request a Quote', href: '/request-a-quote' },
      bg: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)'
    },
    {
      title: 'Reliable teams. On time.',
      subtitle: 'Scale with experienced engineers and project managers who get things done.',
      cta: { label: 'Our Services', href: '/services' },
      bg: 'linear-gradient(135deg,#e0f7fa 0%,#80deea 100%)'
    },
    {
      title: 'From concept to delivery',
      subtitle: 'We partner with you through product discovery, engineering and deployment.',
      cta: { label: 'Contact Us', href: '/contact-us' },
      bg: 'linear-gradient(135deg,#e6e9ff 0%,#9fa8ff 100%)'
    }
  ]

  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState({ active: false, startX: 0, dx: 0 })
  const containerRef = useRef(null)

  // Note: index is controlled by setters below (clamped on update); no effect needed here.

  // pointer handlers (works for mouse & touch)
  function handlePointerDown(e) {
    const x = e.clientX ?? (e.touches && e.touches[0].clientX)
    setDrag({ active: true, startX: x, dx: 0 })
  }

  function handlePointerMove(e) {
    if (!drag.active) return
    const x = e.clientX ?? (e.touches && e.touches[0].clientX)
    if (typeof x !== 'number') return
    setDrag(d => ({ ...d, dx: x - d.startX }))
  }

  function handlePointerUp() {
    if (!drag.active) return
    const threshold = (containerRef.current?.offsetWidth || 600) * 0.15
    if (drag.dx > threshold) setIndex(i => Math.max(0, i - 1))
    else if (drag.dx < -threshold) setIndex(i => Math.min(slides.length - 1, i + 1))
    setDrag({ active: false, startX: 0, dx: 0 })
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex(i => Math.min(slides.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length])

  return (
    <section className="w-full">
      <div className="mx-auto ">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(calc(${-(index * 100)}% + ${drag.dx}px))`
            }}
          >
            {slides.map((s, i) => (
              <div key={i} className="min-w-full flex-none">
                <div className="h-[420px] md:h-[540px] flex items-center">
                  <div className="w-full h-full rounded-2xl p-8 md:p-12 flex items-center" style={{ background: s.bg }}>
                    <div className="max-w-2xl">
                      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{s.title}</h2>
                      <p className="text-gray-700 mb-6">{s.subtitle}</p>
                      <div className="flex gap-3">
                        <a href={s.cta.href} className="inline-block px-5 py-3 bg-[#DB3A06] text-white rounded-md font-medium">{s.cta.label}</a>
                        <a href="/about-us" className="inline-block px-5 py-3 border border-gray-200 rounded-md text-gray-700">Learn more</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev/Next arrows */}
          <button
            aria-label="Previous"
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => setIndex(i => Math.min(slides.length - 1, i + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-[#DB3A06]' : 'bg-white/70 border border-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
