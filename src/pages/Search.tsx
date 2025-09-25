import { useState } from 'react';
import { useItemsSearch } from '../hooks/queries/useItems';

export default function Search() {
  const [q, setQ] = useState('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const { data, isFetching } = useItemsSearch({ q, type: type as any, page, per_page: 12 });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <div className="flex flex-wrap items-center gap-3">
        <input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} placeholder="Search items..." className="w-full max-w-sm rounded border px-3 py-2" />
        <select value={type ?? ''} onChange={(e) => { setPage(1); setType(e.target.value || undefined); }} className="rounded border px-3 py-2">
          <option value="">All types</option>
          <option value="book">Book</option>
          <option value="flash">Flash</option>
        </select>
      </div>
      {isFetching && <p>Searching...</p>}
      <ul className="space-y-2">
        {data?.data.map((i) => (
          <li key={i.id} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{i.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{i.type} • {i.stage}</p>
              </div>
              {i.image_path && <img src={i.image_path} alt={i.title} className="h-12 w-12 rounded object-cover" />}
            </div>
          </li>
        ))}
      </ul>
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


