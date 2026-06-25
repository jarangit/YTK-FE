import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FeedItem } from '../types';

const apiRequest = vi.fn();

function createFeedItem(overrides: Partial<FeedItem> = {}): FeedItem {
  return {
    id: 'feed-1',
    type: 'INSIGHT',
    title: 'Psychology insight',
    body: 'A useful idea about focus',
    metadata: {
      insight: 'Focus improves when friction is removed',
      howToApply: 'Remove one distraction before deep work',
      whyImportant: 'Small environment changes compound',
    },
    keywords: ['psychology', 'focus'],
    score: 30.82,
    createdAt: '2026-06-25T14:39:07.059Z',
    analysis: {
      id: 'analysis-1',
      language: 'th',
      status: 'COMPLETED',
      summary: 'A summary about attention and behavior',
      createdAt: '2026-06-25T14:38:57.198Z',
    },
    video: {
      id: 'video-1',
      youtubeVideoId: 'abc123',
      youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
      title: null,
      thumbnail: null,
      channelName: null,
      duration: null,
    },
    ...overrides,
  };
}

async function importFeedApi(useMockApi: boolean) {
  vi.resetModules();

  vi.doMock('../../../shared/api/config', () => ({
    USE_MOCK_API: useMockApi,
    mockDelay: vi.fn(() => Promise.resolve()),
  }));

  vi.doMock('../../../shared/api/httpClient', () => ({
    apiRequest,
  }));

  return import('./feedApi');
}

describe('feedApi', () => {
  beforeEach(() => {
    apiRequest.mockReset();
    vi.restoreAllMocks();
  });

  it('unwraps the GET /feed response envelope', async () => {
    const item = createFeedItem();
    apiRequest.mockResolvedValue({
      data: {
        items: [item],
        nextCursor: 'feed-1',
        hasMore: true,
      },
      timestamp: '2026-06-25T14:40:00.000Z',
    });
    const { listFeed } = await importFeedApi(false);

    await expect(listFeed()).resolves.toEqual({
      items: [item],
      nextCursor: 'feed-1',
      hasMore: true,
    });
  });

  it('sends type, keyword, limit, and cursor query params to GET /feed', async () => {
    apiRequest.mockResolvedValue({
      data: {
        items: [],
        nextCursor: null,
        hasMore: false,
      },
      timestamp: '2026-06-25T14:40:00.000Z',
    });
    const { listFeed } = await importFeedApi(false);

    await listFeed({ type: 'INSIGHT', keyword: 'psychology', limit: 10, cursor: 'feed-10' });

    expect(apiRequest).toHaveBeenCalledWith('/feed', {
      auth: false,
      query: {
        type: 'INSIGHT',
        keyword: 'psychology',
        limit: 10,
        cursor: 'feed-10',
      },
    });
  });

  it('filters and paginates mock feed items by type and keyword', async () => {
    const { listFeed } = await importFeedApi(true);

    const firstPage = await listFeed({ type: 'OUTCOME', keyword: 'NAS', limit: 2 });

    expect(firstPage.items.length).toBeGreaterThan(0);
    expect(firstPage.items.every((item) => item.type === 'OUTCOME')).toBe(true);
    expect(firstPage.items.some((item) => item.keywords.includes('NAS'))).toBe(true);
    expect(firstPage.hasMore).toBe(true);

    const secondPage = await listFeed({
      type: 'OUTCOME',
      keyword: 'NAS',
      limit: 2,
      cursor: firstPage.nextCursor ?? undefined,
    });

    expect(secondPage.items.every((item) => item.id !== firstPage.items[0]?.id)).toBe(true);
  });

  it('calls POST /feed/:id/save and unwraps the response envelope', async () => {
    apiRequest.mockResolvedValue({
      data: { id: 'library-entry-1' },
      timestamp: '2026-06-25T14:40:00.000Z',
    });
    const { saveFeedItem } = await importFeedApi(false);

    await expect(saveFeedItem('feed-1')).resolves.toEqual({ id: 'library-entry-1' });
    expect(apiRequest).toHaveBeenCalledWith('/feed/feed-1/save', {
      method: 'POST',
    });
  });
});
