import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { dashboardReportMock } from '../data/report.mock';
import type { DashboardReport, PeriodOption } from '../types';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

function unwrapData<T>(response: T | ApiEnvelope<T>): T {
  return typeof response === 'object' && response !== null && 'data' in response
    ? (response as ApiEnvelope<T>).data
    : (response as T);
}

export async function fetchDashboardReport(period: PeriodOption, limit = 10): Promise<DashboardReport> {
  if (USE_MOCK_API) {
    await mockDelay();
    return dashboardReportMock;
  }

  const response = await apiRequest<DashboardReport | ApiEnvelope<DashboardReport>>(
    '/admin/dashboard',
    {
      auth: false,
      query: { period, limit: String(limit) },
    },
  );

  return unwrapData(response);
}
