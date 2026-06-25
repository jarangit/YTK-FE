import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { analyticsMock } from '../data/analytics.mock';
import type { AnalyticsItem, AnalyticsPeriod } from '../types';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

interface ListTrendingAnalyticsParams {
  period?: AnalyticsPeriod;
  limit?: number;
}

function unwrapData<T>(response: T | ApiEnvelope<T>): T {
  return typeof response === 'object' && response !== null && 'data' in response
    ? response.data
    : response;
}

export async function listTrendingAnalytics(
  params: ListTrendingAnalyticsParams = {},
): Promise<AnalyticsItem[]> {
  const period = params.period ?? '7d';
  const limit = Math.min(params.limit ?? 10, 50);

  if (USE_MOCK_API) {
    await mockDelay();
    return analyticsMock.slice(0, limit);
  }

  const response = await apiRequest<AnalyticsItem[] | ApiEnvelope<AnalyticsItem[]>>('/analytics/trending', {
    auth: false,
    query: {
      period,
      limit,
    },
  });

  return unwrapData(response);
}
