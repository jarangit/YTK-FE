import { useQuery } from '@tanstack/react-query';
import { listTrendingAnalytics } from '../api/analyticsApi';
import { toHomeFeaturedAnalysis } from '../homeFeaturedAnalysis';

export function useHomeFeaturedAnalysisQuery() {
  return useQuery({
    queryKey: ['home', 'featured-analysis', 'trending', '7d', 1],
    queryFn: async () => {
      const items = await listTrendingAnalytics({ period: '7d', limit: 1 });
      const item = items[0];

      return item ? toHomeFeaturedAnalysis(item) : null;
    },
  });
}
