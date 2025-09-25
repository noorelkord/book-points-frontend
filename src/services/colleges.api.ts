import http from './http';
import type { College } from '../types/college';

export async function list(): Promise<College[]> {
  const { data } = await http.get<College[]>('/colleges');
  return data;
}


