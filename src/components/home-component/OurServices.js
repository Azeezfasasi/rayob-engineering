import React from 'react'
import Link from 'next/link'

// Simple inline SVG icons keyed by service title (keeps bundle small and avoids
// adding an external dependency). Each returns an accessible <svg> element.
function ServiceIcon({ name }) {
  const size = 20
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true }

  switch ((name || '').toLowerCase()) {
    case 'engineering':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.5 7.5 0 00.6-2.5 7.5 7.5 0 00-.6-2.5l2.1-1.6-1.8-3.1-2.5 1a8 8 0 00-2.2-1.3L14.6 1h-4l-.9 4.1a7.9 7.9 0 00-2.2 1.3l-2.5-1L2.9 8.4 5 10a7.5 7.5 0 000 5l-2.1 1.6 1.8 3.1 2.5-1c.6.5 1.3.9 2.2 1.3L10.6 23h4l.9-4.1c.8-.3 1.6-.8 2.2-1.3l2.5 1 1.8-3.1L19.4 15z" />
        </svg>
      )
    case 'telecoms':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20v-4m0-8V4m4 16a8 8 0 10-8 0" />
        </svg>
      )
    case 'optical fibre implementation & maintenance':
    case 'optical fibre implementation & maintenance'.toLowerCase():
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h3m12 0h3M8 7l8 10M16 7l-8 10" />
        </svg>
      )
    case 'construction':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l7-4 7 4v11" />
        </svg>
      )
    case 'procurement':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.2-6H6.2L7 13zM7 13l-1 7h12l-1-7" />
        </svg>
      )
    case 'sales & distribution':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7v14m10-14v14M3 7l4-4h10l4 4" />
        </svg>
      )
    case 'project management':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3v3M5 6h14" />
        </svg>
      )
    case 'risk management':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.6 9.7-8 11-4.4-1.3-8-6-8-11V6l8-4z" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
        </svg>
      )
    case 'training & manpower development':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
        </svg>
      )
    case 'general contracts':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10H7z" />
          <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M7 3h10v4H7z" />
        </svg>
      )
    default:
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      )
  }
}

const services = [
  { title: 'Engineering', desc: 'Design, planning and technical delivery across civil and infrastructure projects.' },
  { title: 'Telecoms', desc: 'End-to-end telecommunications services including network rollout and optimisation.' },
  { title: 'Optical fibre implementation & maintenance', desc: 'Fibre installation, splicing and ongoing maintenance for reliable connectivity.' },
  { title: 'Construction', desc: 'Civil and building works delivered to specification, on time and on budget.' },
  { title: 'Procurement', desc: 'Sourcing of high-quality materials and equipment with trusted supply chains.' },
  { title: 'Sales & distribution', desc: 'Telecoms equipment and building materials distribution across regions.' },
  { title: 'Project Management', desc: 'Experienced PMs to run projects from kickoff through handover.' },
  { title: 'Risk Management', desc: 'Risk assessments, mitigation planning and governance support.' },
  { title: 'Training & Manpower Development', desc: 'Skills development and training programs to upskill your teams.' },
  { title: 'General Contracts', desc: 'Contracting services for a wide range of general works and packages.' }
]

export default function OurServices() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
          <p className="mt-4 text-gray-600">We deliver a wide range of engineering and telecoms services tailored to enterprise needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s.title} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <div className="flex flex-col items-start gap-4">
                <div className="shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-linear-to-br from-orange-400 to-red-500 text-white">
                    <ServiceIcon name={s.title} />
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center px-6 py-3 bg-[#DB3A06] text-white rounded-md font-medium hover:bg-orange-600">Explore all services</Link>
        </div>
      </div>
    </section>
  )
}
