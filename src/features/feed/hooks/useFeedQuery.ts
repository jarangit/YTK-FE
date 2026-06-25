import { useQuery } from '@tanstack/react-query';
import { listFeed, type ListFeedParams } from '../api/feedApi';
import type { FeedItemType } from '../types';

export const feedKeys = {
  all: ['feed'] as const,
  list: (params: ListFeedParams) => [...feedKeys.all, 'list', params.type ?? 'ALL', params.keyword ?? ''] as const,
  detail: (id: string) => [...feedKeys.all, 'detail', id] as const,
};

export function useFeedQuery(keyword: string, type?: FeedItemType) {
  const normalizedKeyword = keyword.trim();

  return useQuery({
    queryKey: feedKeys.list({ keyword: normalizedKeyword, type }),
    queryFn: () => listFeed({ keyword: normalizedKeyword, type }),
  });
}
