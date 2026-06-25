import { beforeEach, describe, expect, it, vi } from 'vitest';

const apiRequest = vi.fn();

async function importAnalyticsApi(useMockApi: boolean) {
  vi.resetModules();

  vi.doMock('../../../shared/api/config', () => ({
    USE_MOCK_API: useMockApi,
    mockDelay: vi.fn(() => Promise.resolve()),
  }));

  vi.doMock('../../../shared/api/httpClient', () => ({
    apiRequest,
  }));

  return import('./analyticsApi');
}

describe('analyticsApi', () => {
  beforeEach(() => {
    apiRequest.mockReset();
    vi.restoreAllMocks();
  });

  it('unwraps the GET /analytics/trending response envelope', async () => {
    const item = {
      videoId: 'video-1',
      viewCount: 42,
      rank: 1,
      video: null,
      analysis: null,
    };
    apiRequest.mockResolvedValue({
      data: [item],
      timestamp: '2026-06-25T12:01:00.000Z',
    });
    const { listTrendingAnalytics } = await importAnalyticsApi(false);

    await expect(listTrendingAnalytics({ period: '7d', limit: 1 })).resolves.toEqual([item]);
  });

  it('sends period and limit query params to GET /analytics/trending', async () => {
    apiRequest.mockResolvedValue({
      data: [],
      timestamp: '2026-06-25T12:01:00.000Z',
    });
    const { listTrendingAnalytics } = await importAnalyticsApi(false);

    await listTrendingAnalytics({ period: '7d', limit: 1 });

    expect(apiRequest).toHaveBeenCalledWith('/analytics/trending', {
      auth: false,
      query: {
        period: '7d',
        limit: 1,
      },
    });
  });

  it('returns mock analytics items and preserves nullable video/analysis fields', async () => {
    const { listTrendingAnalytics } = await importAnalyticsApi(true);

    const items = await listTrendingAnalytics({ period: '7d', limit: 2 });

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveProperty('video');
    expect(items[0]).toHaveProperty('analysis');
  });
});
