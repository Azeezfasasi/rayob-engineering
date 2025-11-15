'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Eye, EyeOff, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const ManageBlogPage = () => {
	// Router
	const router = useRouter()

	// State management
	const [posts, setPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState('all') // all, published, draft
	const [authorFilter, setAuthorFilter] = useState('all')
	const [sortBy, setSortBy] = useState('date-desc') // date-desc, date-asc, title-asc, title-desc
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [postToDelete, setPostToDelete] = useState(null)
	const [authors, setAuthors] = useState([])

	const postsPerPage = 10

	// Mock data - Replace with actual API calls
	useEffect(() => {
		loadPosts()
		loadAuthors()
	}, [])

	const loadPosts = async () => {
		setLoading(true)
		try {
			// Mock API call - Replace with actual endpoint
			const mockPosts = [
				{
					id: 1,
					title: 'Getting Started with Next.js',
					slug: 'getting-started-nextjs',
					excerpt: 'Learn the basics of Next.js framework',
					author: 'John Doe',
					authorId: 1,
					status: 'published',
					createdAt: new Date('2025-01-10'),
					updatedAt: new Date('2025-01-10'),
					views: 245,
					comments: 12,
				},
				{
					id: 2,
					title: 'Advanced React Patterns',
					slug: 'advanced-react-patterns',
					excerpt: 'Master advanced React design patterns',
					author: 'Jane Smith',
					authorId: 2,
					status: 'published',
					createdAt: new Date('2025-01-08'),
					updatedAt: new Date('2025-01-08'),
					views: 189,
					comments: 8,
				},
				{
					id: 3,
					title: 'Tailwind CSS Best Practices',
					slug: 'tailwind-css-best-practices',
					excerpt: 'Tips and tricks for efficient Tailwind usage',
					author: 'John Doe',
					authorId: 1,
					status: 'draft',
					createdAt: new Date('2025-01-15'),
					updatedAt: new Date('2025-01-15'),
					views: 0,
					comments: 0,
				},
				{
					id: 4,
					title: 'Building Scalable Applications',
					slug: 'building-scalable-apps',
					excerpt: 'Architecture patterns for large-scale systems',
					author: 'Mike Johnson',
					authorId: 3,
					status: 'published',
					createdAt: new Date('2025-01-05'),
					updatedAt: new Date('2025-01-05'),
					views: 512,
					comments: 34,
				},
				{
					id: 5,
					title: 'Database Optimization Tips',
					slug: 'database-optimization',
					excerpt: 'Performance tuning for databases',
					author: 'Jane Smith',
					authorId: 2,
					status: 'draft',
					createdAt: new Date('2025-01-20'),
					updatedAt: new Date('2025-01-20'),
					views: 0,
					comments: 0,
				},
			]
			setPosts(mockPosts)
		} catch (error) {
			console.error('Failed to load posts:', error)
		} finally {
			setLoading(false)
		}
	}

	const loadAuthors = () => {
		// Mock authors data
		const mockAuthors = [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Smith' },
			{ id: 3, name: 'Mike Johnson' },
		]
		setAuthors(mockAuthors)
	}

	// Filter and search logic
	useEffect(() => {
		let filtered = [...posts]

		// Search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase()
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(query) ||
					post.excerpt.toLowerCase().includes(query) ||
					post.author.toLowerCase().includes(query)
			)
		}

		// Status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter((post) => post.status === statusFilter)
		}

		// Author filter
		if (authorFilter !== 'all') {
			filtered = filtered.filter((post) => post.authorId === parseInt(authorFilter))
		}

		// Sorting
		if (sortBy === 'date-desc') {
			filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		} else if (sortBy === 'date-asc') {
			filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		} else if (sortBy === 'title-asc') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === 'title-desc') {
			filtered.sort((a, b) => b.title.localeCompare(a.title))
		}

		setFilteredPosts(filtered)
		setCurrentPage(1) // Reset to first page when filters change
	}, [posts, searchQuery, statusFilter, authorFilter, sortBy])

	// Pagination
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
	const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

	// Actions
	const handleEdit = (postId) => {
		// Navigate to edit page using Next.js router
		router.push(`/dashboard/manage-blog/${postId}`)
	}

	const handleStatusChange = useCallback(
		async (postId, newStatus) => {
			try {
				// Mock API call - Replace with actual endpoint
				setPosts(
					posts.map((post) =>
						post.id === postId ? { ...post, status: newStatus, updatedAt: new Date() } : post
					)
				)
				// Show success message
				console.log(`Post ${postId} status changed to ${newStatus}`)
			} catch (error) {
				console.error('Failed to change status:', error)
			}
		},
		[posts]
	)

	const handleDeleteClick = (post) => {
		setPostToDelete(post)
		setShowDeleteModal(true)
	}

	const handleDeleteConfirm = async () => {
		if (!postToDelete) return

		try {
			// Mock API call - Replace with actual endpoint
			setPosts(posts.filter((post) => post.id !== postToDelete.id))
			setShowDeleteModal(false)
			setPostToDelete(null)
			console.log(`Post ${postToDelete.id} deleted successfully`)
		} catch (error) {
			console.error('Failed to delete post:', error)
		}
	}

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	return (
		<div className="space-y-6 border overflow-x-hidden">
			{/* Header with Create Button */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden">
				<h2 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h2>
				<Link
					href="/dashboard/add-blog"
					className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
				>
					+ Create New Post
				</Link>
			</div>

			{/* Filters Section */}
			<div className="bg-white rounded-lg border-gray-200 p-4 shadow-sm border overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
					{/* Search */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
						<div className="relative">
							<input
								type="text"
								placeholder="Search posts..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
							/>
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						</div>
					</div>

					{/* Status Filter */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2 overflow-hidden">Status</label>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
						>
							<option value="all">All Status</option>
							<option value="published">Published</option>
							<option value="draft">Draft</option>
						</select>
					</div>

					{/* Author Filter */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
						<select
							value={authorFilter}
							onChange={(e) => setAuthorFilter(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
						>
							<option value="all">All Authors</option>
							{authors.map((author) => (
								<option key={author.id} value={author.id}>
									{author.name}
								</option>
							))}
						</select>
					</div>

					{/* Sort By */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
						>
							<option value="date-desc">Newest First</option>
							<option value="date-asc">Oldest First</option>
							<option value="title-asc">Title A-Z</option>
							<option value="title-desc">Title Z-A</option>
						</select>
					</div>
				</div>

				{/* Active Filters Display */}
				{(searchQuery || statusFilter !== 'all' || authorFilter !== 'all') && (
					<div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
						<span className="text-sm text-gray-600">Active filters:</span>
						{searchQuery && (
							<span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
								Search: {searchQuery}
								<button
									onClick={() => setSearchQuery('')}
									className="hover:text-blue-900"
									aria-label="Clear search"
								>
									×
								</button>
							</span>
						)}
						{statusFilter !== 'all' && (
							<span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
								Status: {statusFilter}
								<button
									onClick={() => setStatusFilter('all')}
									className="hover:text-green-900"
									aria-label="Clear status filter"
								>
									×
								</button>
							</span>
						)}
						{authorFilter !== 'all' && (
							<span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
								Author: {authors.find((a) => a.id === parseInt(authorFilter))?.name}
								<button
									onClick={() => setAuthorFilter('all')}
									className="hover:text-purple-900"
									aria-label="Clear author filter"
								>
									×
								</button>
							</span>
						)}
					</div>
				)}
			</div>

			{/* Results Count */}
			<div className="text-sm text-gray-600">
				Showing <span className="font-medium">{indexOfFirstPost + 1}</span> to{' '}
				<span className="font-medium">{Math.min(indexOfLastPost, filteredPosts.length)}</span> of{' '}
				<span className="font-medium">{filteredPosts.length}</span> posts
			</div>

			{/* Posts Table */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
				{loading ? (
					<div className="p-8 text-center text-gray-500">Loading posts...</div>
				) : currentPosts.length === 0 ? (
					<div className="p-8 text-center text-gray-500">
						<p className="text-lg font-medium">No posts found</p>
						<p className="text-sm">Try adjusting your filters or create a new post</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Views</th>
									<th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{currentPosts.map((post) => (
									<tr key={post.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 text-sm">
											<div>
												<p className="font-medium text-gray-900">{post.title}</p>
												<p className="text-xs text-gray-500 truncate">{post.excerpt}</p>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-700">{post.author}</td>
										<td className="px-6 py-4 text-sm">
											<div className="flex items-center gap-2">
												{post.status === 'published' ? (
													<Eye className="w-4 h-4 text-green-600" />
												) : (
													<EyeOff className="w-4 h-4 text-yellow-600" />
												)}
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${
														post.status === 'published'
															? 'bg-green-100 text-green-700'
															: 'bg-yellow-100 text-yellow-700'
													}`}
												>
													{post.status === 'published' ? 'Published' : 'Draft'}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-700">{formatDate(post.createdAt)}</td>
										<td className="px-6 py-4 text-sm text-gray-700">{post.views}</td>
										<td className="px-6 py-4 text-right">
											<div className="flex items-center justify-end gap-2">
												{/* Status Toggle Dropdown */}
												<div className="relative group">
													<button
														title="Change Status"
														className={`p-2 rounded-lg transition-colors ${
															post.status === 'published'
																? 'text-green-600 hover:bg-green-100 bg-green-50'
																: 'text-yellow-600 hover:bg-yellow-100 bg-yellow-50'
														}`}
													>
														{post.status === 'published' ? (
															<Eye className="w-4 h-4" />
														) : (
															<EyeOff className="w-4 h-4" />
														)}
													</button>
													<div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg z-10">
														<button
															onClick={() =>
																handleStatusChange(
																	post.id,
																	post.status === 'published' ? 'draft' : 'published'
																)
															}
															className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 whitespace-nowrap first:rounded-t-lg last:rounded-b-lg"
														>
															{post.status === 'published' ? 'Move to Draft' : 'Publish'}
														</button>
													</div>
												</div>

												{/* Edit Button */}
												<button
													onClick={() => handleEdit(post.id)}
													title="Edit Post"
													className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors bg-blue-50"
												>
													<Edit2 className="w-4 h-4" />
												</button>

												{/* Delete Button */}
												<button
													onClick={() => handleDeleteClick(post)}
													title="Delete Post"
													className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors bg-red-50"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Pagination */}
			{!loading && filteredPosts.length > postsPerPage && (
				<div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
					<div className="text-sm text-gray-600">
						Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
							className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Previous page"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>

						{/* Page numbers */}
						<div className="flex gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1)
								.filter(
									(page) =>
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 1 && page <= currentPage + 1)
								)
								.map((page, index, arr) => (
									<React.Fragment key={page}>
										{index > 0 && arr[index - 1] !== page - 1 && (
											<span className="px-2 py-2 text-gray-500">...</span>
										)}
										<button
											onClick={() => setCurrentPage(page)}
											className={`px-3 py-2 rounded-lg transition-colors ${
												currentPage === page
													? 'bg-indigo-600 text-white'
													: 'border border-gray-300 hover:bg-gray-50'
											}`}
										>
											{page}
										</button>
									</React.Fragment>
								))}
						</div>

						<button
							onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
							disabled={currentPage === totalPages}
							className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							aria-label="Next page"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
						<h3 className="text-lg font-bold text-gray-900 mb-2">Delete Post?</h3>
						<p className="text-gray-600 mb-6">
							Are you sure you want to delete &#34;<span className="font-medium">{postToDelete?.title}</span>&#34;? This action
							cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
							>
								Cancel
							</button>
							<button
								onClick={handleDeleteConfirm}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ManageBlogPage
