import http from './http';
import type { Item, ItemType } from '../types/item';
import type { Paginated } from '../types/api';

export type ItemsListParams = {
  type?: ItemType;
  stage?: string;
  college_id?: number;
  location_id?: number;
  q?: string;
  page?: number;
  per_page?: number;
};

export type ItemsFilterParams = {
  types?: ItemType[];
  years?: string[]; // mapping years -> stage per spec
  college_id?: number;
  location_id?: number;
  q?: string;
  page?: number;
  per_page?: number;
};

export async function list(params: ItemsListParams): Promise<Paginated<Item>> {
  const { data } = await http.get<Paginated<Item>>('/items', { params });
  return data;
}

export async function filter(params: ItemsFilterParams): Promise<Paginated<Item>> {
  // Laravel expects array params as types[] and years[]
  const { data } = await http.get<Paginated<Item>>('/items/filter', {
    params,
    paramsSerializer: {
      indexes: null,
    },
  } as any);
  return data;
}

export async function search(params: { q: string; type?: ItemType; page?: number; per_page?: number }): Promise<Paginated<Item>> {
  const { data } = await http.get<Paginated<Item>>('/items/search', { params });
  return data;
}

export async function create(form: FormData): Promise<Item> {
  const { data } = await http.post<Item>('/items', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function reserve(itemId: number): Promise<any> {
  const { data } = await http.post(`/items/${itemId}/reserve`);
  return data;
}

export async function getUserReservations(): Promise<Paginated<Item>> {
  const { data } = await http.get<Paginated<Item>>('/items/reserved');
  return data;
}


