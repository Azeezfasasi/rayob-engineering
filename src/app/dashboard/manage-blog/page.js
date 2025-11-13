import React from 'react'
import PageTitle from '@/components/home-component/PageTitle'

export default function ManageBlogPage() {
	return (
		<div className="container mx-auto px-6 lg:px-20 py-12">
			<PageTitle title="Manage Blog" subtitle="Create and manage blog posts" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Manage Blog' }]} />
			<div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
				<p className="text-gray-600">Blog manager placeholder — add UI to create/edit posts here.</p>
			</div>
		</div>
	)
}
