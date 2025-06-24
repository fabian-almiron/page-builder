'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Sites() {
  const { profile } = useAuth()
  
  const allSites = [
    { id: '1', name: 'Main Website', url: 'https://example.com', status: 'Active' },
    { id: '2', name: 'Blog', url: 'https://blog.example.com', status: 'Active' },
    { id: '3', name: 'E-commerce', url: 'https://shop.example.com', status: 'Maintenance' },
    { id: '4', name: 'Documentation', url: 'https://docs.example.com', status: 'Active' },
  ]

  // Filter sites based on user role
  const sites = profile?.role === 'admin' 
    ? allSites 
    : allSites.filter(site => site.id === profile?.assigned_site_id)

  const pageTitle = profile?.role === 'admin' ? 'Sites' : 'My Site'
  const pageDescription = profile?.role === 'admin' 
    ? 'Manage your websites and applications'
    : 'Manage your assigned website'

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-2 text-gray-600">{pageDescription}</p>
        {profile?.role === 'client' && (
          <div className="mt-2 text-sm text-blue-600">
            You have access to site: {profile.assigned_site_id}
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {profile?.role === 'admin' && (
            <div className="mb-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New Site
              </button>
            </div>
          )}

          {sites.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sites available</h3>
              <p className="text-gray-600">
                                 {profile?.role === 'admin' 
                   ? 'You haven&apos;t created any sites yet.' 
                   : 'You don&apos;t have access to any sites.'}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sites.map((site) => (
                    <tr key={site.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {site.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {site.url}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          site.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {site.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                        {profile?.role === 'admin' && (
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 