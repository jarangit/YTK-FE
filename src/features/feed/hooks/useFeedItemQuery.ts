import { useQuery } from '@tanstack/react-query';
import { getFeedItem } from '../api/feedApi';
import { feedKeys } from './useFeedQuery';

export function useFeedItemQuery(id: string) {
  return useQuery({
    queryKey: feedKeys.detail(id),
    queryFn: () => getFeedItem(id),
    enabled: id.length > 0,
  });
}
