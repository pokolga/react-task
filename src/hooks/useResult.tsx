import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/fetch';
import { defaultCasheTime } from '../models/constants';

export function useResult(activeQuery: string, pageNum: number) {
  return useQuery({
    queryKey: ['characters', activeQuery, pageNum],
    queryFn: async () => {
      const data = await getData(activeQuery, pageNum);
      return data;
    },
    retry: false,
    staleTime: defaultCasheTime,
    select: (data) => ({
      results: data.results,
      info: data.info,
    }),
  });
}
