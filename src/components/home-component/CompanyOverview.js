import Image from "next/image";

export default function CompanyOverview() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Image */}
        <div className="flex-1">
          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/projectplaceholder.png"
              alt="Rayob Engineering Overview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>Mission:</strong> To provide innovative, reliable, and cost-effective engineering solutions that empower businesses, enhance communities, and drive sustainable development.
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Vision:</strong> To be a leading engineering company recognized for excellence, innovation, and integrity, shaping a future where every project meets the highest standards of quality and efficiency.
          </p>

          <a
            href="/about"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}
