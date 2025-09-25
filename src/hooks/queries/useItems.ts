import { useQuery } from '@tanstack/react-query';
import * as itemsApi from '../../services/items.api';

export function useItems(params: itemsApi.ItemsListParams) {
  return useQuery({
    queryKey: ['items', params],
    queryFn: () => itemsApi.list(params),
    keepPreviousData: true,
  });
}

export function useItemsFilter(params: itemsApi.ItemsFilterParams) {
  return useQuery({
    queryKey: ['items', 'filter', params],
    queryFn: () => itemsApi.filter(params),
    keepPreviousData: true,
  });
}

export function useItemsSearch(params: { q: string; type?: itemsApi.ItemsListParams['type']; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => itemsApi.search(params),
    enabled: !!params.q,
    keepPreviousData: true,
  });
}

export function useUserReservations() {
  return useQuery({
    queryKey: ['user', 'reservations'],
    queryFn: () => itemsApi.getUserReservations(),
  });
}


