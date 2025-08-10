import { QueryClient } from '@tanstack/react-query';
import { defaultCasheTime } from './models/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: defaultCasheTime,
    },
  },
});
