import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { engagementQuestionsMock } from '../data/engagementQuestions.mock';
import type { EngagementQuestionItem, EngagementQuestionsPagePayload } from '../types';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

export interface ListEngagementQuestionsParams {
  keyword?: string;
  limit?: number;
  cursor?: string;
  random?: boolean;
}

function unwrapData<T>(response: T | ApiEnvelope<T>): T {
  return typeof response === 'object' && response !== null && 'data' in response
    ? response.data
    : response;
}

function cursorKey(item: EngagementQuestionItem, index: number) {
  return `${item.analysisId}:${index % 5}`;
}

function matchesKeyword(item: EngagementQuestionItem, keyword: string) {
  const haystack = [
    item.video.title,
    item.video.channelName,
    item.question,
    item.answer,
    item.hook,
    item.whyInteresting,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(keyword.toLowerCase());
}

function filterMockItems(items: EngagementQuestionItem[], keyword?: string) {
  const normalizedKeyword = keyword?.trim();

  if (!normalizedKeyword) {
    return items;
  }

  return items.filter((item) => matchesKeyword(item, normalizedKeyword));
}

function shuffleItems(items: EngagementQuestionItem[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export async function listEngagementQuestions(
  params: ListEngagementQuestionsParams = {},
): Promise<EngagementQuestionsPagePayload> {
  const limit = Math.min(params.limit ?? 10, 50);

  if (USE_MOCK_API) {
    await mockDelay();
    const filteredItems = filterMockItems(engagementQuestionsMock, params.keyword);

    if (params.random) {
      return {
        items: shuffleItems(filteredItems).slice(0, limit),
        nextCursor: null,
        hasMore: false,
      };
    }

    const startIndex = params.cursor
      ? filteredItems.findIndex((item, index) => cursorKey(item, index) === params.cursor) + 1
      : 0;
    const safeStartIndex = Math.max(0, startIndex);
    const pageItems = filteredItems.slice(safeStartIndex, safeStartIndex + limit);
    const lastItem = pageItems.at(-1) ?? null;
    const lastItemIndex = lastItem ? safeStartIndex + pageItems.length - 1 : -1;
    const nextCursor = lastItem && safeStartIndex + pageItems.length < filteredItems.length
      ? cursorKey(lastItem, lastItemIndex)
      : null;

    return {
      items: pageItems,
      nextCursor,
      hasMore: nextCursor !== null,
    };
  }

  const response = await apiRequest<EngagementQuestionsPagePayload | ApiEnvelope<EngagementQuestionsPagePayload>>(
    '/engagement-questions',
    {
      auth: false,
      query: {
        random: params.random || undefined,
        keyword: params.keyword?.trim() || undefined,
        limit,
        cursor: params.cursor,
      },
    },
  );

  return unwrapData(response);
}
