"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "Industrial Plant Construction",
    category: "Industrial",
    featuredImage: "/images/projectplaceholder.png",
    images: ["/images/projectplaceholder.png", "/images/projectplaceholder.png"],
    description: "State-of-the-art industrial facility with advanced safety systems and energy efficiency.",
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    title: "Residential Estate Development",
    category: "Residential",
    featuredImage: "/images/projectplaceholder.png",
    images: ["/images/projectplaceholder.png", "/images/projectplaceholder.png"],
    description: "Modern residential estate using sustainable materials and smart home technologies.",
    location: "Abuja, Nigeria",
  },
  {
    id: 3,
    title: "Commercial Office Renovation",
    category: "Commercial",
    featuredImage: "/images/projectplaceholder.png",
    images: ["/images/projectplaceholder.png", "/images/projectplaceholder.png", "/images/projectplaceholder.png"],
    description: "Full-scale renovation of multi-floor office complex with modern upgrades.",
    location: "Port Harcourt, Nigeria",
  },
  {
    id: 4,
    title: "Industrial Warehouse Setup",
    category: "Industrial",
    featuredImage: "/images/projectplaceholder.png",
    images: ["/images/projectplaceholder.png"],
    description: "Efficient warehouse design with optimal workflow and logistics solutions.",
    location: "Kano, Nigeria",
  },
];

const categories = ["All", "Industrial", "Residential", "Commercial"];

export default function ProjectsGalleryModal() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  // Small in-file slider component for modal images
  function ModalSlider({ images }) {
    const containerRef = useRef(null)
    const [index, setIndex] = useState(0)
    const [drag, setDrag] = useState({ active: false, startX: 0, dx: 0 })
    const [width, setWidth] = useState(0)

    useLayoutEffect(() => {
      function update() {
        setWidth(containerRef.current?.offsetWidth || 0)
      }
      update()
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }, [])

    function onDown(e) {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX)
      setDrag({ active: true, startX: x, dx: 0 })
    }
    function onMove(e) {
      if (!drag.active) return
      const x = e.clientX ?? (e.touches && e.touches[0].clientX)
      if (typeof x !== 'number') return
      setDrag(d => ({ ...d, dx: x - d.startX }))
    }
    function onUp() {
      if (!drag.active) return
      const threshold = (width || 300) * 0.15
      if (drag.dx > threshold) setIndex(i => Math.max(0, i - 1))
      else if (drag.dx < -threshold) setIndex(i => Math.min(images.length - 1, i + 1))
      setDrag({ active: false, startX: 0, dx: 0 })
    }

    return (
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative overflow-hidden w-full touch-pan-y"
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        >
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(${-(index * (width || 0)) + drag.dx}px)` }}>
            {images.map((src, i) => (
              <div key={src + i} className="min-w-full flex-none relative" style={{ flex: '0 0 100%' }}>
                <div className="relative w-full h-80 sm:h-96">
                  <Image src={src} alt={`slide-${i}`} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>

          {/* Prev/Next */}
          <button aria-label="Prev" onClick={() => setIndex(i => Math.max(0, i - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">‹</button>
          <button aria-label="Next" onClick={() => setIndex(i => Math.min(images.length - 1, i + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">›</button>

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#db3a06]' : 'bg-white/80 border border-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our completed projects across Industrial, Residential, and Commercial sectors.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-[#db3a06] text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-orange-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
              onClick={() => setActiveProject(project)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={project.featuredImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-[#db3a06] font-semibold uppercase">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={() => setActiveProject(null)}
          role="presentation"
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setActiveProject(null)}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-80 sm:h-96">
              <ModalSlider images={activeProject.images ?? [activeProject.image]} />
            </div>
            <div className="p-6">
              <span className="text-sm text-[#db3a06] font-semibold uppercase">
                {activeProject.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
                {activeProject.title}
              </h3>
              <p className="text-gray-600">{activeProject.description}</p>
              <p className="text-gray-600 font-semibold">{activeProject.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
