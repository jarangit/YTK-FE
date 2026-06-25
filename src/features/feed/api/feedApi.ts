import type { FeedItem, FeedItemType, FeedPagePayload, SaveFeedItemResponse } from '../types';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { feedMock } from '../data/feed.mock';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

export interface ListFeedParams {
  type?: FeedItemType;
  keyword?: string;
  limit?: number;
  cursor?: string;
}

function unwrapData<T>(response: T | ApiEnvelope<T>): T {
  return typeof response === 'object' && response !== null && 'data' in response
    ? response.data
    : response;
}

function metadataText(metadata: FeedItem['metadata']) {
  if (!metadata) return '';

  return Object.values(metadata)
    .filter((value): value is string | number | boolean => (
      typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
    ))
    .join(' ');
}

function filterFeed(items: FeedItem[], params: ListFeedParams = {}) {
  const normalizedKeyword = params.keyword?.trim() ?? '';
  const typeFilteredItems = params.type
    ? items.filter((item) => item.type === params.type)
    : items;

  if (!normalizedKeyword) {
    return typeFilteredItems;
  }

  return typeFilteredItems.filter((item) =>
    item.keywords.includes(normalizedKeyword) ||
    item.title.includes(normalizedKeyword) ||
    item.body.includes(normalizedKeyword) ||
    (item.analysis.summary ?? '').includes(normalizedKeyword) ||
    metadataText(item.metadata).includes(normalizedKeyword) ||
    (item.video.title ?? '').includes(normalizedKeyword) ||
    (item.video.channelName ?? '').includes(normalizedKeyword),
  );
}

export async function listFeed(params: ListFeedParams = {}): Promise<FeedPagePayload> {
  const limit = Math.min(params.limit ?? 10, 50);

  if (USE_MOCK_API) {
    await mockDelay();
    const filteredItems = filterFeed(feedMock, params);
    const startIndex = params.cursor
      ? filteredItems.findIndex((item) => item.id === params.cursor) + 1
      : 0;
    const pageItems = filteredItems.slice(Math.max(0, startIndex), Math.max(0, startIndex) + limit);
    const lastItem = pageItems.at(-1) ?? null;
    const nextCursor = lastItem && (startIndex + pageItems.length) < filteredItems.length
      ? lastItem.id
      : null;

    return {
      items: pageItems,
      nextCursor,
      hasMore: nextCursor !== null,
    };
  }

  const response = await apiRequest<FeedPagePayload | ApiEnvelope<FeedPagePayload>>('/feed', {
    auth: false,
    query: {
      type: params.type,
      keyword: params.keyword?.trim() || undefined,
      limit,
      cursor: params.cursor,
    },
  });

  return unwrapData(response);
}

export async function getFeedItem(id: string): Promise<FeedItem | null> {
  if (USE_MOCK_API) {
    await mockDelay();
    return feedMock.find((item) => item.id === id) ?? null;
  }

  const response = await apiRequest<FeedItem | ApiEnvelope<FeedItem>>(`/feed/${id}`, {
    auth: false,
  });
  return unwrapData(response);
}

export async function saveFeedItem(id: string): Promise<SaveFeedItemResponse> {
  if (USE_MOCK_API) {
    await mockDelay();
    return { id: `library-${id}` };
  }

  const response = await apiRequest<SaveFeedItemResponse | ApiEnvelope<SaveFeedItemResponse>>(`/feed/${id}/save`, {
    method: 'POST',
  });
  return unwrapData(response);
}
