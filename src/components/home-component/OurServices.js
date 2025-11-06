import React from 'react'
import Link from 'next/link'

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
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-linear-gradient-to-br from-orange-400 to-red-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
