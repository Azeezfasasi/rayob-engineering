"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "Industrial Plant Construction",
    category: "Industrial",
    image: "/images/projectplaceholder.png",
    description: "State-of-the-art industrial facility with advanced safety systems and energy efficiency.",
  },
  {
    id: 2,
    title: "Residential Estate Development",
    category: "Residential",
    image: "/images/projectplaceholder.png",
    description: "Modern residential estate using sustainable materials and smart home technologies.",
  },
  {
    id: 3,
    title: "Commercial Office Renovation",
    category: "Commercial",
    image: "/images/projectplaceholder.png",
    description: "Full-scale renovation of multi-floor office complex with modern upgrades.",
  },
  {
    id: 4,
    title: "Industrial Warehouse Setup",
    category: "Industrial",
    image: "/images/projectplaceholder.png",
    description: "Efficient warehouse design with optimal workflow and logistics solutions.",
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
                  src={project.image}
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-3xl w-full relative overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setActiveProject(null)}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-80 sm:h-96">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-sm text-[#db3a06] font-semibold uppercase">
                {activeProject.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
                {activeProject.title}
              </h3>
              <p className="text-gray-600">{activeProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
