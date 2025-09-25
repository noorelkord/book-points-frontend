import { useState } from 'react';
import { useItemsSearch } from '../hooks/queries/useItems';
import ItemCard from '../components/items/ItemCard';

export default function Search() {
  const [q, setQ] = useState('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useItemsSearch({ q, type: type as any, page, per_page: 12 });

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="container-responsive py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="card p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Search Items</h1>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  value={q} 
                  onChange={(e) => { setPage(1); setQ(e.target.value); }} 
                  placeholder="Search items..." 
                  className="input-primary pl-10" 
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={type ?? ''} 
                  onChange={(e) => { setPage(1); setType(e.target.value || undefined); }} 
                  className="input-primary min-w-[140px]"
                >
                  <option value="">All types</option>
                  <option value="book">Book</option>
                  <option value="flash">Flash</option>
                </select>
                
                <button className="btn-secondary px-4 py-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isFetching && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          )}

          {/* Results */}
          {!isFetching && data && (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {data.meta?.total || data.data.length} items
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {data.meta && data.meta.last_page > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button 
                    className="btn-secondary px-4 py-2" 
                    disabled={page <= 1} 
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {data.meta.current_page} of {data.meta.last_page}
                  </span>
                  <button 
                    className="btn-secondary px-4 py-2" 
                    disabled={data.meta.current_page >= data.meta.last_page} 
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!isFetching && data && data.data.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


