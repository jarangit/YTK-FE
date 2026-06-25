import type { FeedItem, FeedItemType, SaveFeedItemResponse } from '../types';
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
  const normalizedKeyword = params.keyword?.trim().toLowerCase() ?? '';
  const typeFilteredItems = params.type
    ? items.filter((item) => item.type === params.type)
    : items;

  if (!normalizedKeyword) {
    return typeFilteredItems;
  }

  return typeFilteredItems.filter((item) =>
    item.title.toLowerCase().includes(normalizedKeyword) ||
    item.body.toLowerCase().includes(normalizedKeyword) ||
    (item.analysis.summary ?? '').toLowerCase().includes(normalizedKeyword) ||
    metadataText(item.metadata).toLowerCase().includes(normalizedKeyword) ||
    (item.video.title ?? '').toLowerCase().includes(normalizedKeyword) ||
    (item.video.channelName ?? '').toLowerCase().includes(normalizedKeyword) ||
    item.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedKeyword)),
  );
}

export async function listFeed(params: ListFeedParams = {}): Promise<FeedItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return filterFeed(feedMock, params);
  }

  const response = await apiRequest<FeedItem[] | ApiEnvelope<FeedItem[]>>('/feed', {
    auth: false,
    query: {
      type: params.type,
      keyword: params.keyword?.trim() || undefined,
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
