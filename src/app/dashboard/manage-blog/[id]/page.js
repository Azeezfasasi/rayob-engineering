'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function EditBlogContent() {
	const router = useRouter()
	const params = useParams()
	const postId = params?.id

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		content: '',
		excerpt: '',
		category: '',
		tags: '',
		author: '',
		featuredImage: null,
		featuredImagePreview: '',
		metaTitle: '',
		metaDescription: '',
		metaKeywords: '',
		status: 'draft',
		publishedDate: '',
	})

	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [message, setMessage] = useState(null)
	const [charCount, setCharCount] = useState(0)
	const [hasChanges, setHasChanges] = useState(false)

	// Load post data
	const loadPost = useCallback(async () => {
		try {
			setLoading(true)
			// Mock data - Replace with actual API call
			const mockPost = {
				id: postId,
				title: 'Getting Started with Next.js',
				slug: 'getting-started-nextjs',
				excerpt: 'Learn the basics of Next.js framework',
				content:
					'# Getting Started with Next.js\n\nNext.js is a powerful React framework that enables functionality such as server-side rendering and static site generation.\n\n## Why Next.js?\n\n- **Performance**: Optimized for speed with automatic code splitting\n- **SEO**: Built-in SEO features\n- **Developer Experience**: Great tooling and documentation',
				category: 'project-updates',
				tags: 'nextjs, react, framework',
				author: 'John Doe',
				featuredImage: null,
				featuredImagePreview: '/images/about1.jpg',
				metaTitle: 'Getting Started with Next.js - Guide',
				metaDescription: 'A comprehensive guide to get started with Next.js framework',
				metaKeywords: 'nextjs, react, framework, tutorial',
				status: 'published',
				publishedDate: '2025-01-10',
			}

			setFormData(mockPost)
			setCharCount(mockPost.content.length)
		} catch (error) {
			console.error('Failed to load post:', error)
			setMessage({ type: 'error', text: 'Failed to load post' })
		} finally {
			setLoading(false)
		}
	}, [postId])

	useEffect(() => {
		loadPost()
	}, [loadPost])

	function handleInputChange(e) {
		const { name, value, type, checked } = e.target
		setFormData((prev) => {
			const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }

			// Auto-generate slug from title
			if (name === 'title') {
				updated.slug = value
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.replace(/\s+/g, '-')
			}

			return updated
		})
		setHasChanges(true)
	}

	function handleContentChange(e) {
		const content = e.target.value
		setFormData((prev) => ({ ...prev, content }))
		setCharCount(content.length)
		setHasChanges(true)
	}

	function handleImageChange(e) {
		const file = e.target.files?.[0]
		if (file) {
			setFormData((prev) => ({ ...prev, featuredImage: file }))
			const reader = new FileReader()
			reader.onload = (event) => {
				setFormData((prev) => ({
					...prev,
					featuredImagePreview: event.target.result,
				}))
			}
			reader.readAsDataURL(file)
			setHasChanges(true)
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
		setSaving(true)
		setMessage(null)

		try {
			const data = new FormData()
			Object.entries(formData).forEach(([key, value]) => {
				if (key === 'featuredImagePreview') return
				if (value instanceof File) {
					data.append(key, value)
				} else if (value !== null && value !== '') {
					data.append(key, value)
				}
			})

			// Mock API call - Replace with actual endpoint
			// const response = await fetch(`/api/blog/${postId}`, { method: 'PUT', body: data })
			// const result = await response.json()

			// Simulate successful update
			await new Promise((resolve) => setTimeout(resolve, 1000))

			setMessage({ type: 'success', text: 'Blog post updated successfully!' })
			setHasChanges(false)
			setTimeout(() => {
				router.push('/dashboard/manage-blog')
			}, 1500)
		} catch (err) {
			setMessage({ type: 'error', text: `Error: ${err.message}` })
		} finally {
			setSaving(false)
		}
	}

	function insertMarkdown(before, after) {
		const textarea = document.getElementById('content')
		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const text = textarea.value
		const selected = text.substring(start, end)
		const newText = text.substring(0, start) + before + selected + after + text.substring(end)

		setFormData((prev) => ({ ...prev, content: newText }))
		setCharCount(newText.length)
		setHasChanges(true)

		setTimeout(() => {
			textarea.focus()
			textarea.selectionStart = textarea.selectionEnd = start + before.length
		}, 0)
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center py-12">
					<p className="text-gray-600">Loading post...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Header with Back Button */}
				<div className="mb-8 flex items-center gap-4">
					<Link
						href="/dashboard/manage-blog"
						className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Posts
					</Link>
				</div>

				{/* Title */}
				<div className="mb-8">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Blog Post</h1>
					<p className="mt-2 text-gray-600">Make changes to your blog post and publish updates.</p>
				</div>

				{/* Message Alert */}
				{message && (
					<div
						className={`mb-6 p-4 rounded-lg ${
							message.type === 'success'
								? 'bg-green-50 border border-green-200 text-green-800'
								: 'bg-red-50 border border-red-200 text-red-800'
						}`}
					>
						{message.text}
					</div>
				)}

				{/* Unsaved Changes Warning */}
				{hasChanges && (
					<div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
						You have unsaved changes. Remember to save before leaving this page.
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm space-y-6 p-6 md:p-8">
					{/* Post Information */}
					<fieldset>
						<legend className="text-lg font-semibold text-gray-900 mb-4">Post Information</legend>
						<div className="space-y-4">
							<div>
								<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
									Post Title *
								</label>
								<input
									type="text"
									id="title"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="e.g., Getting Started with Next.js"
								/>
								<p className="text-xs text-gray-500 mt-1">This will appear as the main headline</p>
							</div>

							<div>
								<label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
									URL Slug
								</label>
								<input
									type="text"
									id="slug"
									name="slug"
									value={formData.slug}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-gray-50"
									placeholder="auto-generated from title"
								/>
								<p className="text-xs text-gray-500 mt-1">Auto-generated from title, edit if needed</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
										Author *
									</label>
									<input
										type="text"
										id="author"
										name="author"
										value={formData.author}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
										placeholder="Author name"
									/>
								</div>
								<div>
									<label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700 mb-2">
										Publish Date
									</label>
									<input
										type="date"
										id="publishedDate"
										name="publishedDate"
										value={formData.publishedDate}
										onChange={handleInputChange}
										className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									/>
								</div>
							</div>
						</div>
					</fieldset>

					{/* Excerpt */}
					<div>
						<label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
							Excerpt *
						</label>
						<textarea
							id="excerpt"
							name="excerpt"
							value={formData.excerpt}
							onChange={handleInputChange}
							required
							rows="3"
							maxLength="160"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
							placeholder="Brief summary of the post (displayed in listings)"
						/>
						<p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/160 characters</p>
					</div>

					{/* Content */}
					<div>
						<label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
							Content *
						</label>
						<div className="border border-gray-300 rounded-md overflow-hidden">
							{/* Text Editor Toolbar */}
							<div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-2">
								<button
									type="button"
									onClick={() => insertMarkdown('**', '**')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Bold"
								>
									<strong>B</strong>
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('*', '*')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Italic"
								>
									<em>I</em>
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('# ', '\n')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Heading"
								>
									H1
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('## ', '\n')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Subheading"
								>
									H2
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('- ', '\n')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Bullet List"
								>
									• List
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('[', '](url)')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Link"
								>
									🔗 Link
								</button>
								<button
									type="button"
									onClick={() => insertMarkdown('`', '`')}
									className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
									title="Code"
								>
									&lt;&gt; Code
								</button>
							</div>
							<textarea
								id="content"
								name="content"
								value={formData.content}
								onChange={handleContentChange}
								required
								rows="12"
								className="w-full px-4 py-3 border-0 focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
								placeholder="Write your blog post content here... Supports Markdown formatting"
							/>
						</div>
						<p className="text-xs text-gray-500 mt-2">{charCount} characters • Markdown supported</p>
					</div>

					{/* Category & Tags */}
					<fieldset>
						<legend className="text-lg font-semibold text-gray-900 mb-4">Organization</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
									Category *
								</label>
								<select
									id="category"
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
								>
									<option value="">Select a category</option>
									<option value="construction">Construction</option>
									<option value="project-updates">Project Updates</option>
									<option value="industry-news">Industry News</option>
									<option value="tips-tricks">Tips & Tricks</option>
									<option value="company-news">Company News</option>
									<option value="case-studies">Case Studies</option>
								</select>
							</div>
							<div>
								<label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
									Tags
								</label>
								<input
									type="text"
									id="tags"
									name="tags"
									value={formData.tags}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="Separate tags with commas"
								/>
								<p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
							</div>
						</div>
					</fieldset>

					{/* Featured Image */}
					<fieldset>
						<legend className="text-lg font-semibold text-gray-900 mb-4">Media</legend>
						<div>
							<label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
								Featured Image
							</label>

							{/* Image Preview */}
							{formData.featuredImagePreview && (
								<div className="mb-4 relative max-w-xs">
									<Image
										src={formData.featuredImagePreview}
										alt="Featured image preview"
										width={400}
										height={200}
										className="max-h-48 rounded-lg border border-gray-300"
									/>
									<button
										type="button"
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												featuredImage: null,
												featuredImagePreview: '',
											}))
										}
										className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
									>
										Remove
									</button>
								</div>
							)}

							<div className="flex items-center justify-center w-full">
								<label
									htmlFor="featuredImage"
									className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
								>
									<div className="flex flex-col items-center justify-center pt-5 pb-6">
										<Upload className="w-8 h-8 mb-2 text-gray-500" />
										<p className="text-sm text-gray-600">
											<span className="font-semibold">Click to upload</span> or drag and drop
										</p>
										<p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
									</div>
									<input
										type="file"
										id="featuredImage"
										name="featuredImage"
										onChange={handleImageChange}
										accept="image/*"
										className="hidden"
									/>
								</label>
							</div>
						</div>
					</fieldset>

					{/* SEO */}
					<fieldset>
						<legend className="text-lg font-semibold text-gray-900 mb-4">SEO</legend>
						<div className="space-y-4">
							<div>
								<label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
									Meta Title
								</label>
								<input
									type="text"
									id="metaTitle"
									name="metaTitle"
									value={formData.metaTitle}
									onChange={handleInputChange}
									maxLength="60"
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="SEO title (60 chars max)"
								/>
								<p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
							</div>
							<div>
								<label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
									Meta Description
								</label>
								<textarea
									id="metaDescription"
									name="metaDescription"
									value={formData.metaDescription}
									onChange={handleInputChange}
									maxLength="160"
									rows="2"
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
									placeholder="SEO description (160 chars max)"
								/>
								<p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
							</div>
							<div>
								<label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-2">
									Meta Keywords
								</label>
								<input
									type="text"
									id="metaKeywords"
									name="metaKeywords"
									value={formData.metaKeywords}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
									placeholder="Separate keywords with commas"
								/>
							</div>
						</div>
					</fieldset>

					{/* Publish Status */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">Publish Status</label>
						<div className="flex gap-4">
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									name="status"
									value="published"
									checked={formData.status === 'published'}
									onChange={handleInputChange}
									className="w-4 h-4 rounded-full border-gray-300"
								/>
								<span className="text-sm font-medium text-gray-700">Published</span>
							</label>
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									name="status"
									value="draft"
									checked={formData.status === 'draft'}
									onChange={handleInputChange}
									className="w-4 h-4 rounded-full border-gray-300"
								/>
								<span className="text-sm font-medium text-gray-700">Draft</span>
							</label>
						</div>
						<p className="text-xs text-gray-500 mt-2">Select the publication status for this post</p>
					</div>

					{/* Actions */}
					<div className="flex gap-4 pt-6 border-t">
						<button
							type="submit"
							disabled={saving}
							className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							{saving ? 'Saving...' : 'Save Changes'}
						</button>
						<Link
							href="/dashboard/manage-blog"
							className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-center"
						>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default function EditBlogPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center py-12">
						<p className="text-gray-600">Loading post...</p>
					</div>
				</div>
			}
		>
			<EditBlogContent />
		</Suspense>
	)
}
