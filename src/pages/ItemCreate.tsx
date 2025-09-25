import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColleges } from '../hooks/queries/useColleges';
import { useLocations, useMeetingPoints } from '../hooks/queries/useLocations';
import { create as createItem } from '../services/items.api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';

const schema = z.object({
  title: z.string().min(2),
  type: z.enum(['book', 'flash']),
  stage: z.string().min(1),
  college_id: z.coerce.number().int().positive(),
  location_id: z.coerce.number().int().positive(),
  meeting_point_id: z.coerce.number().int().positive().optional(),
  description: z.string().optional(),
  image: z.any(),
});

type FormValues = z.infer<typeof schema>;

export default function ItemCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, watch, setValue, setError, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const colleges = useColleges();
  const locations = useLocations();
  const locationId = watch('location_id');
  const meetingPoints = useMeetingPoints(locationId);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('type');
    if (t === 'book' || t === 'flash') {
      setValue('type', t);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    // Reset meeting point when location changes
    setValue('meeting_point_id', undefined as unknown as number);
  }, [locationId, setValue]);

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Create Item</h1>
      <form
        onSubmit={handleSubmit(async (v) => {
          setServerError(null);
          if ((meetingPoints.data?.length ?? 0) > 0 && !v.meeting_point_id) {
            setError('meeting_point_id', { type: 'manual', message: 'Please select a meeting point' });
            return;
          }
          const form = new FormData();
          form.append('title', v.title);
          form.append('type', v.type);
          // Send both to satisfy validation (stage) and DB schema (year)
          form.append('stage', v.stage);
          form.append('year', v.stage);
          form.append('college_id', String(v.college_id));
          if (v.meeting_point_id) form.append('meeting_point_id', String(v.meeting_point_id));
          if (v.description) form.append('description', v.description);
          const file = (v.image as any)?.[0] as File | undefined;
          if (file) form.append('image', file);

          try {
            await createItem(form);
            navigate('/items');
          } catch (e) {
            const err = e as AxiosError<any>;
            const message = (err.response?.data && (err.response.data.message || err.response.data.error)) || err.message || 'Failed to create item';
            setServerError(message);
          }
        })}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm">Title</label>
          <input {...register('title')} className="w-full rounded border px-3 py-2" />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm">Type</label>
            <select {...register('type')} className="w-full rounded border px-3 py-2">
              <option value="book">Book</option>
              <option value="flash">Flash</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Stage</label>
            <input {...register('stage')} className="w-full rounded border px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm">College</label>
            <select {...register('college_id', { valueAsNumber: true })} className="w-full rounded border px-3 py-2">
              <option value="">Select college</option>
              {colleges.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Location</label>
            <select {...register('location_id', { valueAsNumber: true })} className="w-full rounded border px-3 py-2">
              <option value="">Select location</option>
              {locations.data?.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm">Meeting Point</label>
          <select
            {...register('meeting_point_id', { valueAsNumber: true })}
            className="w-full rounded border px-3 py-2"
            disabled={!locationId || meetingPoints.isLoading || (meetingPoints.data?.length ?? 0) === 0}
          >
            {!locationId && <option value="">Select location first</option>}
            {locationId && meetingPoints.isLoading && <option value="">Loading...</option>}
            {locationId && !meetingPoints.isLoading && (meetingPoints.data?.length ?? 0) === 0 && (
              <option value="">No meeting points</option>
            )}
            {meetingPoints.data?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          {errors.meeting_point_id && <p className="text-sm text-red-600">{errors.meeting_point_id.message || 'Meeting point is required'}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea {...register('description')} className="w-full rounded border px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Image (optional)</label>
          <input type="file" accept="image/*" {...register('image')} className="w-full rounded border px-3 py-2" />
          {errors.image && <p className="text-sm text-red-600">{String(errors.image.message || '')}</p>}
        </div>
        <button
          disabled={
            isSubmitting || (
              !!locationId && meetingPoints.isSuccess && (meetingPoints.data?.length ?? 0) === 0
            )
          }
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
        >
          Create
        </button>
        {!!locationId && meetingPoints.isSuccess && (meetingPoints.data?.length ?? 0) === 0 && (
          <p className="text-sm text-amber-700">No meeting points for this location. Choose a different location.</p>
        )}
        {serverError && (
          <p className="text-sm text-red-600">{serverError}</p>
        )}
      </form>
    </section>
  );
}


