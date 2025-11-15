"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

// Sample project data - replace with API call
const SAMPLE_PROJECTS = [
  { id: 1, name: 'Commercial Complex Alpha', category: 'commercial', location: 'Lagos', budget: 50000000, status: 'in-progress', completion: 65, enabled: true, description: 'A large commercial complex with modern facilities', startDate: '2023-01-15', endDate: '2024-12-31', client: 'XYZ Corp', teamLead: 'John Doe', teamMembers: 'Jane Smith, Bob Johnson', technologies: 'BIM, CAD', materials: 'Concrete, Steel, Glass', highlights: 'LEED Certified, Green Building' },
  { id: 2, name: 'Residential Estate Beta', category: 'residential', location: 'Abuja', budget: 35000000, status: 'completed', completion: 100, enabled: true, description: 'Premium residential estate', startDate: '2022-06-01', endDate: '2023-12-15', client: 'Home Builders Inc', teamLead: 'Alice Johnson', teamMembers: 'Charlie Brown, Diana Prince', technologies: 'Traditional methods', materials: 'Brick, Concrete', highlights: 'Award-winning architecture' },
  { id: 3, name: 'Industrial Facility Gamma', category: 'industrial', location: 'Port Harcourt', budget: 80000000, status: 'in-progress', completion: 45, enabled: true, description: 'Manufacturing facility', startDate: '2023-03-10', endDate: '2024-09-30', client: 'Industrial Co', teamLead: 'Mark Wilson', teamMembers: 'Sarah Davis, Tom Hardy', technologies: 'Advanced automation', materials: 'Steel, Reinforced Concrete', highlights: 'State-of-the-art equipment' },
  { id: 4, name: 'Infrastructure Highway', category: 'infrastructure', location: 'Lagos-Ibadan', budget: 120000000, status: 'planning', completion: 20, enabled: false, description: 'Major highway construction', startDate: '2024-01-01', endDate: '2026-06-30', client: 'Federal Government', teamLead: 'Gov Official', teamMembers: 'Contractor A, Contractor B', technologies: 'Road engineering standards', materials: 'Asphalt, Concrete', highlights: 'Economic corridor' },
  { id: 5, name: 'Office Renovation Delta', category: 'renovation', location: 'Lagos', budget: 15000000, status: 'completed', completion: 100, enabled: true, description: 'Corporate office renovation', startDate: '2023-08-01', endDate: '2023-11-30', client: 'Tech Corp', teamLead: 'Emma Stone', teamMembers: 'Oliver Wood', technologies: 'Modern design software', materials: 'Wood, Glass, Aluminum', highlights: 'Modern workspace design' },
  { id: 6, name: 'Shopping Mall Epsilon', category: 'commercial', location: 'Abuja', budget: 90000000, status: 'in-progress', completion: 55, enabled: true, description: 'Large shopping complex', startDate: '2023-05-20', endDate: '2025-03-31', client: 'Retail Group', teamLead: 'Henry Ford', teamMembers: 'Grace Lee, Ivan Chen', technologies: 'Smart building systems', materials: 'Composite materials', highlights: 'Multi-level parking, Entertainment zone' },
]

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = parseInt(params.id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    startDate: '',
    endDate: '',
    status: 'in-progress',
    client: '',
    teamLead: '',
    teamMembers: '',
    featuredImage: null,
    galleryImages: [],
    technologies: '',
    materials: '',
    completionPercentage: 0,
    highlights: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  // Load project data on mount
  useEffect(() => {
    const project = SAMPLE_PROJECTS.find(p => p.id === projectId)
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        category: project.category,
        location: project.location,
        budget: project.budget,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        client: project.client || '',
        teamLead: project.teamLead || '',
        teamMembers: project.teamMembers || '',
        featuredImage: null,
        galleryImages: [],
        technologies: project.technologies || '',
        materials: project.materials || '',
        completionPercentage: project.completion,
        highlights: project.highlights || ''
      })
    }
    setLoading(false)
  }, [projectId])

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e) {
    const { name, files } = e.target
    if (name === 'featuredImage') {
      setFormData(prev => ({ ...prev, [name]: files?.[0] || null }))
    } else if (name === 'galleryImages') {
      setFormData(prev => ({ ...prev, [name]: Array.from(files || []) }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      // Prepare FormData for file uploads
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'galleryImages' && Array.isArray(value)) {
          value.forEach((file, i) => {
            if (file instanceof File) {
              data.append(`galleryImages[${i}]`, file)
            }
          })
        } else if (value instanceof File) {
          data.append(key, value)
        } else if (value !== null && value !== '') {
          data.append(key, value)
        }
      })

      const response = await fetch(`/api/projects/${projectId}`, { method: 'PUT', body: data })
      const result = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Project updated successfully!' })
        setTimeout(() => router.push('/dashboard/all-projects'), 2000)
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update project' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: `Error: ${err.message}` })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard/all-projects" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-2 inline-flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Project</h1>
            <p className="mt-2 text-gray-600">Update project details and information.</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm space-y-6 p-6 md:p-8">
          {/* Project Basics */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Project Basics</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="e.g., Commercial Complex" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option value="">Select category</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>
              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input type="text" id="client" name="client" value={formData.client} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="Client name" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="e.g., Lagos, Nigeria" />
              </div>
            </div>
          </fieldset>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" placeholder="Describe the project in detail..." />
          </div>

          {/* Timeline & Budget */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Timeline & Budget</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Expected End Date *</label>
                <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">Budget (₦) *</label>
                <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} required step="1000" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="0" />
              </div>
              <div>
                <label htmlFor="completionPercentage" className="block text-sm font-medium text-gray-700 mb-2">Completion % (0-100)</label>
                <input type="number" id="completionPercentage" name="completionPercentage" value={formData.completionPercentage} onChange={handleInputChange} min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
              </div>
            </div>
          </fieldset>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Project Status *</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          {/* Team */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Team</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="teamLead" className="block text-sm font-medium text-gray-700 mb-2">Team Lead</label>
                <input type="text" id="teamLead" name="teamLead" value={formData.teamLead} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="Lead name" />
              </div>
              <div>
                <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                <input type="text" id="teamMembers" name="teamMembers" value={formData.teamMembers} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="Separate by comma" />
              </div>
            </div>
          </fieldset>

          {/* Technologies & Materials */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">Technologies & Methods</label>
                <textarea id="technologies" name="technologies" value={formData.technologies} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" placeholder="e.g., BIM, sustainable materials, etc." />
              </div>
              <div>
                <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-2">Materials Used</label>
                <textarea id="materials" name="materials" value={formData.materials} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" placeholder="e.g., concrete, steel, etc." />
              </div>
            </div>
          </fieldset>

          {/* Highlights */}
          <div>
            <label htmlFor="highlights" className="block text-sm font-medium text-gray-700 mb-2">Project Highlights</label>
            <textarea id="highlights" name="highlights" value={formData.highlights} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" placeholder="Key achievements, awards, special features..." />
          </div>

          {/* Images */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Media</legend>
            <div className="space-y-4">
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <input type="file" id="featuredImage" name="featuredImage" onChange={handleImageChange} accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                {formData.featuredImage && <p className="text-sm text-gray-600 mt-2">✓ {formData.featuredImage.name}</p>}
              </div>
              <div>
                <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (multiple)</label>
                <input type="file" id="galleryImages" name="galleryImages" onChange={handleImageChange} accept="image/*" multiple className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                {formData.galleryImages.length > 0 && <p className="text-sm text-gray-600 mt-2">✓ {formData.galleryImages.length} image(s) selected</p>}
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <button type="submit" disabled={saving} className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/dashboard/all-projects" className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-200 text-center focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
