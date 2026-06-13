import type { FeedItem } from '../types';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { feedMock } from '../data/feed.mock';

export interface ListFeedParams {
  query?: string;
}

function filterFeed(items: FeedItem[], query = '') {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) =>
    item.title.toLowerCase().includes(normalizedQuery) ||
    item.channelName.toLowerCase().includes(normalizedQuery) ||
    item.topic.toLowerCase().includes(normalizedQuery) ||
    item.excerpt.toLowerCase().includes(normalizedQuery) ||
    item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
  );
}

export async function listFeed(params: ListFeedParams = {}): Promise<FeedItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return filterFeed(feedMock, params.query);
  }

  return apiRequest<FeedItem[]>('/feed', { query: { query: params.query } });
}

export async function getFeedItem(id: string): Promise<FeedItem | null> {
  if (USE_MOCK_API) {
    await mockDelay();
    return feedMock.find((item) => item.id === id) ?? null;
  }

  return apiRequest<FeedItem>(`/feed/${id}`);
}
