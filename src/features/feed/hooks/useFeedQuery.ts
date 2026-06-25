import { useInfiniteQuery } from '@tanstack/react-query';
import { listFeed, type ListFeedParams } from '../api/feedApi';
import type { FeedItemType } from '../types';

export const feedKeys = {
  all: ['feed'] as const,
  list: (params: ListFeedParams) => [
    ...feedKeys.all,
    'list',
    params.type ?? 'ALL',
    params.keyword ?? '',
    params.limit ?? 10,
  ] as const,
  detail: (id: string) => [...feedKeys.all, 'detail', id] as const,
};

export function useFeedQuery(keyword: string, type?: FeedItemType, limit = 10) {
  const normalizedKeyword = keyword.trim();

  return useInfiniteQuery({
    queryKey: feedKeys.list({ keyword: normalizedKeyword, type, limit }),
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => listFeed({
      keyword: normalizedKeyword,
      type,
      limit,
      cursor: pageParam ?? undefined,
    }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore || !lastPage.nextCursor) {
        return undefined;
      }

      const previousCursor = allPages.at(-2)?.nextCursor;

      if (lastPage.nextCursor === previousCursor) {
        return undefined;
      }

      return lastPage.nextCursor;
    },
  });
}
