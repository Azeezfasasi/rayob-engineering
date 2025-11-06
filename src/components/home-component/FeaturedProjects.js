import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Industrial Plant Construction",
    description:
      "Design and execution of a state-of-the-art manufacturing facility with advanced safety systems and energy efficiency.",
    image: "/images/projectplaceholder.png", // Replace with real image
    category: "Industrial",
  },
  {
    id: 2,
    title: "Commercial Building Renovation",
    description:
      "Full-scale renovation of a multi-floor office complex, upgrading electrical, plumbing, and HVAC systems.",
    image: "/images/projectplaceholder.png",
    category: "Commercial",
  },
  {
    id: 3,
    title: "Residential Estate Development",
    description:
      "Construction of a modern residential estate featuring sustainable materials and smart home technologies.",
    image: "/images/projectplaceholder.png",
    category: "Residential",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of our key engineering projects that demonstrate
            innovation, quality, and excellence across industries.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-56">
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
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={`/projects/${project.id}`} // Future dynamic route
                  className="text-[#db3a06] font-semibold hover:text-orange-600 transition"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-block bg-[#db3a06] text-white px-8 py-3 rounded-lg shadow hover:bg-orange-600 transition"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
