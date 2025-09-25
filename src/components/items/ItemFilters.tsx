import { useForm } from 'react-hook-form';
import type { ItemType } from '../../types/item';
import { useColleges } from '../../hooks/queries/useColleges';
import { useLocations } from '../../hooks/queries/useLocations';

export type Filters = {
  type?: ItemType;
  stage?: string;
  college_id?: number;
  location_id?: number;
  q?: string;
};

export default function ItemFilters({ defaultValues, onChange }: { defaultValues?: Filters; onChange: (f: Filters) => void }) {
  const { register, handleSubmit, reset } = useForm<Filters>({ defaultValues });
  const colleges = useColleges();
  const locations = useLocations();

  return (
    <form onSubmit={handleSubmit(onChange)} className="grid grid-cols-2 gap-3 md:grid-cols-6">
      <input {...register('q')} placeholder="Search..." className="col-span-2 rounded border px-3 py-2 md:col-span-2" />
      <select {...register('type')} className="rounded border px-3 py-2">
        <option value="">Type</option>
        <option value="book">Book</option>
        <option value="flash">Flash</option>
      </select>
      <input {...register('stage')} placeholder="Stage/Year" className="rounded border px-3 py-2" />
      <select {...register('college_id', { valueAsNumber: true })} className="rounded border px-3 py-2">
        <option value="">College</option>
        {colleges.data?.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select {...register('location_id', { valueAsNumber: true })} className="rounded border px-3 py-2">
        <option value="">Location</option>
        {locations.data?.map((l) => (
          <option key={l.id} value={l.id}>{l.name}</option>
        ))}
      </select>
      <div className="col-span-2 flex gap-2 md:col-span-1">
        <button type="submit" className="rounded bg-blue-600 px-3 py-2 text-white">Apply</button>
        <button type="button" onClick={() => { reset({}); onChange({}); }} className="rounded border px-3 py-2">Reset</button>
      </div>
    </form>
  );
}


