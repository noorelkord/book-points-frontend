import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../../hooks/useAuth';
import { useState } from 'react';
import type { AxiosError } from 'axios';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const mutation = useRegister();
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <form onSubmit={handleSubmit(async (v) => {
      setServerError(null);
      try {
        await mutation.mutateAsync(v);
        onSuccess?.();
      } catch (e) {
        const err = e as AxiosError<any>;
        const message = (err.response?.data && (err.response.data.message || err.response.data.error)) || err.message || 'Registration failed';
        setServerError(message);
      }
    })} className="mx-auto max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm">Name</label>
        <input {...register('name')} className="w-full rounded border px-3 py-2" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm">Email</label>
        <input type="email" {...register('email')} className="w-full rounded border px-3 py-2" />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm">Password</label>
        <input type="password" {...register('password')} className="w-full rounded border px-3 py-2" />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm">Phone Number</label>
        <input type="tel" {...register('phone')} className="w-full rounded border px-3 py-2" placeholder="05xxxxxxxx" />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>
      <button disabled={mutation.isPending} className="w-full rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-60">
        {mutation.isPending ? 'Creating...' : 'Register'}
      </button>
      {(serverError || mutation.isError) && (
        <p className="text-center text-sm text-red-600">{serverError ?? 'Registration failed'}</p>
      )}
    </form>
  );
}


