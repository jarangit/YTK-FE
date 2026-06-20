import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../shared/auth/AuthContext';
import { listVideoHistory } from '../api/historyApi';

export function useHistoryQuery() {
  const { isAuthenticated } = useAuth();
  const query = useQuery({
    queryKey: ['video-history'],
    queryFn: listVideoHistory,
    enabled: isAuthenticated,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    hydrated: !isAuthenticated || query.isFetched,
  };
}
