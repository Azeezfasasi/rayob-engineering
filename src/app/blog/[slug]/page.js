import React from 'react'
import Image from 'next/image'
import { findPostBySlug } from '@/lib/blog'
import PageTitle from '@/components/home-component/PageTitle'

export default function PostPage({ params }) {
  const { slug } = params || {}
  const post = findPostBySlug(slug)

  if (!post) {
    return (
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <p className="text-gray-600 mt-4">We could not find the requested blog post.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 lg:px-20 py-16">
      <PageTitle title={post.title} subtitle={post.category} />

      <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden shadow-md">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <div
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  )
}
