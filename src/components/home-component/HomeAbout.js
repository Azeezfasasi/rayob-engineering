// components/AboutSection.jsx
import Image from 'next/image';

export default function HomeAbout() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="flex-1 w-full">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/abt1.jpeg" 
              alt="Rayob Engineering Team"
              fill
              sizes='100%'
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            About Rayob Engineering & Mgt. Co. Ltd.
          </h2>
          <p className="text-gray-600 mb-6">
            Rayob Engineering & Mgt. Co. Ltd is committed to delivering innovative and sustainable engineering solutions. 
            With years of expertise in industrial, residential, and commercial projects, we ensure quality, 
            efficiency, and client satisfaction in every project we undertake.
          </p>
          <p className="text-gray-600 mb-6">
            Our team of skilled engineers and project managers combine technical excellence with practical experience, 
            turning complex challenges into actionable solutions. At Rayob Engineering, we build more than structures — 
            we build lasting relationships with our clients.
          </p>

          <a
            href="/about-us"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}
