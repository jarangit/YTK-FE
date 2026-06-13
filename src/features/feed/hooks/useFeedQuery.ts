import { useQuery } from '@tanstack/react-query';
import { listFeed } from '../api/feedApi';

export const feedKeys = {
  all: ['feed'] as const,
  list: (query: string) => [...feedKeys.all, 'list', query] as const,
  detail: (id: string) => [...feedKeys.all, 'detail', id] as const,
};

export function useFeedQuery(query: string) {
  return useQuery({
    queryKey: feedKeys.list(query),
    queryFn: () => listFeed({ query }),
  });
}
