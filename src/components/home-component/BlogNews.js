"use client";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: "Innovations in Civil Engineering",
    category: "Civil",
    image: "/images/projectplaceholder.png",
    excerpt: "Exploring new technologies in civil engineering that are shaping modern infrastructure.",
    link: "/blog/innovations-in-civil-engineering",
  },
  {
    id: 2,
    title: "Sustainable Industrial Design",
    category: "Industrial",
    image: "/images/projectplaceholder.png",
    excerpt: "How sustainable practices in industrial projects reduce costs and environmental impact.",
    link: "/blog/sustainable-industrial-design",
  },
  {
    id: 3,
    title: "Electrical Installations Best Practices",
    category: "Electrical",
    image: "/images/projectplaceholder.png",
    excerpt: "Key considerations for safe and efficient electrical installations in commercial buildings.",
    link: "/blog/electrical-installations-best-practices",
  },
  {
    id: 4,
    title: "Project Management in Engineering",
    category: "Management",
    image: "/images/projectplaceholder.png",
    excerpt: "Effective project management strategies for complex engineering projects.",
    link: "/blog/project-management-engineering",
  },
];

const categories = ["All", "Civil", "Industrial", "Electrical", "Management"];

export default function BlogNews() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image src={post.image} alt={post.title} fill sizes="100%" loading="eager" className="object-cover" />
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-500 font-semibold uppercase">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={post.link || (`/blog/${post.slug || ''}`)}
                  className="text-blue-500 font-semibold hover:text-blue-700 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
