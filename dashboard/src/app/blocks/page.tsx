export default function Blocks() {
  const blocks = [
    { id: 1, name: 'Hero Section', type: 'Header', category: 'Landing', lastModified: '2024-01-15' },
    { id: 2, name: 'Contact Form', type: 'Form', category: 'Contact', lastModified: '2024-01-14' },
    { id: 3, name: 'Product Grid', type: 'Grid', category: 'E-commerce', lastModified: '2024-01-13' },
    { id: 4, name: 'Testimonials', type: 'Carousel', category: 'Social Proof', lastModified: '2024-01-12' },
    { id: 5, name: 'Pricing Table', type: 'Table', category: 'Pricing', lastModified: '2024-01-11' },
    { id: 6, name: 'Footer', type: 'Footer', category: 'Navigation', lastModified: '2024-01-10' },
  ];

  const categories = ['All', 'Landing', 'Contact', 'E-commerce', 'Social Proof', 'Pricing', 'Navigation'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blocks</h1>
        <p className="mt-2 text-gray-600">Reusable content blocks and components</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Create New Block
              </button>
            </div>
            
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    category === 'All' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <div key={block.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 h-32 flex items-center justify-center">
                  <div className="text-gray-400 text-4xl">📦</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{block.name}</h3>
                  <div className="space-y-1 mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {block.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {block.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Modified:</span> {block.lastModified}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-900 text-sm">
                      Duplicate
                    </button>
                    <button className="text-red-600 hover:text-red-900 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 