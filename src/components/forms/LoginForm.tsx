import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/useAuth';
import { useState } from 'react';
import type { AxiosError } from 'axios';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const login = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <div className="card p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-primary-600 font-bold text-2xl mb-2">BookPoints</h1>
        <h2 className="text-gray-800 text-xl font-semibold">Login</h2>
      </div>
      
      <form onSubmit={handleSubmit(async (v) => {
        setServerError(null);
        try {
          await login.mutateAsync(v);
          onSuccess?.();
        } catch (e) {
          const err = e as AxiosError<any>;
          const message = (err.response?.data && (err.response.data.message || err.response.data.error)) || err.message || 'Login failed';
          setServerError(message);
        }
      })} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
          <input 
            type="email" 
            {...register('email')} 
            className="input-primary" 
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
          <input 
            type="password" 
            {...register('password')} 
            className="input-primary" 
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
        </div>
        
        <button 
          disabled={login.isPending} 
          className="btn-primary w-full py-3 text-base font-semibold disabled:opacity-60"
        >
          {login.isPending ? 'Signing in...' : 'Login'}
        </button>
        
        {(serverError || login.isError) && (
          <p className="text-center text-sm text-red-600">{serverError ?? 'Login failed'}</p>
        )}
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-primary-600 font-medium hover:text-primary-700">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}


