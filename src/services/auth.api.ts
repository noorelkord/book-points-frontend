import http from './http';
import type { LoginRequest, RegisterRequest, AuthUser } from '../types/auth';

export async function login(payload: LoginRequest): Promise<{ token: string }> {
  const { data } = await http.post<{ token: string }>('/auth/login', payload);
  return data;
}

export async function register(payload: RegisterRequest): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>('/auth/register', payload);
  return data;
}

export async function me(): Promise<AuthUser> {
  const { data } = await http.get<AuthUser>('/me');
  return data;
}

export async function logout(): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>('/auth/logout');
  return data;
}


