import { useQuery } from '@tanstack/react-query';
import * as collegesApi from '../../services/colleges.api';

export function useColleges() {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: collegesApi.list,
  });
}


