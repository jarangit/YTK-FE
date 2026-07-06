import { useQuery } from '@tanstack/react-query';
import { fetchDashboardReport } from '../api/reportApi';
import type { PeriodOption } from '../types';

export const reportKeys = {
  all: ['report'] as const,
  dashboard: (period: PeriodOption, limit: number) =>
    [...reportKeys.all, 'dashboard', period, limit] as const,
};

export function useDashboardQuery(period: PeriodOption, limit = 10) {
  return useQuery({
    queryKey: reportKeys.dashboard(period, limit),
    queryFn: () => fetchDashboardReport(period, limit),
  });
}
