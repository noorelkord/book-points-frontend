import { useMemo, useState } from 'react';
import ItemFilters, { Filters } from '../components/items/ItemFilters';
import ItemCard from '../components/items/ItemCard';
import { useItems, useItemsFilter } from '../hooks/queries/useItems';

export default function ItemsList() {
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const isArrayMode = false; // when types[]/years[] present; for now simple filters

  const listParams = useMemo(() => ({ ...filters, page, per_page: 12 }), [filters, page]);

  const query = isArrayMode
    ? useItemsFilter({ page, per_page: 12, q: filters.q, college_id: filters.college_id, location_id: filters.location_id })
    : useItems(listParams);

  const data = query.data;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Items</h1>
      <ItemFilters defaultValues={filters} onChange={(f) => { setPage(1); setFilters(f); }} />

      {query.isLoading && <p>Loading...</p>}
      {query.isError && <p className="text-red-600">Failed to load items</p>}
      {!query.isLoading && data && data.data.length === 0 && <p>No items found.</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {data && data.meta && (
        <div className="flex items-center justify-center gap-3">
          <button className="rounded border px-3 py-1" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <span className="text-sm">Page {data.meta.current_page} of {data.meta.last_page}</span>
          <button className="rounded border px-3 py-1" disabled={data.meta.current_page >= data.meta.last_page} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </section>
  );
}


