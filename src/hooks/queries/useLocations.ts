import { useQuery } from '@tanstack/react-query';
import * as locationsApi from '../../services/locations.api';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: locationsApi.list,
  });
}

export function useMeetingPoints(locationId?: number) {
  return useQuery({
    queryKey: ['locations', locationId, 'meeting-points'],
    queryFn: () => locationsApi.meetingPoints(locationId as number),
    enabled: !!locationId,
  });
}


