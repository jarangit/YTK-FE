import { useInfiniteQuery } from '@tanstack/react-query';
import { listEngagementQuestions, type ListEngagementQuestionsParams } from '../api/engagementQuestionsApi';

export const engagementQuestionsKeys = {
  all: ['engagement-questions'] as const,
  list: (params: ListEngagementQuestionsParams) => [
    ...engagementQuestionsKeys.all,
    'list',
    params.keyword ?? '',
    params.limit ?? 10,
    params.random ?? false,
  ] as const,
};

export function useEngagementQuestionsQuery(keyword: string, limit = 10, random = false) {
  const normalizedKeyword = keyword.trim();

  return useInfiniteQuery({
    queryKey: engagementQuestionsKeys.list({ keyword: normalizedKeyword, limit, random }),
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => listEngagementQuestions({
      keyword: normalizedKeyword,
      limit,
      random,
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
