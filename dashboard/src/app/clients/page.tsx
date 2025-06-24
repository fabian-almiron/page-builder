'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

export default function Clients() {
  const clients = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', projects: 3, status: 'Active' },
    { id: 2, name: 'Tech Solutions Inc', email: 'hello@techsolutions.com', projects: 1, status: 'Active' },
    { id: 3, name: 'Digital Agency', email: 'info@digitalagency.com', projects: 5, status: 'Inactive' },
    { id: 4, name: 'Startup Hub', email: 'team@startuphub.io', projects: 2, status: 'Active' },
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="mt-2 text-gray-600">Manage your client relationships</p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New Client
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <div key={client.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {client.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Projects:</span> {client.projects}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 