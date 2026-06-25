import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { VideoAnalysis } from '../../analysis/types';
import { useAuth } from '../../../shared/auth/AuthContext';
import { checkKeptVideo, keepVideo, listLibraryItems, unkeepVideo } from '../api/libraryApi';

export const libraryKeys = {
  all: ['library'] as const,
  list: (userId: string) => [...libraryKeys.all, userId, 'list'] as const,
};

export function useLibraryQuery() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? '';
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: libraryKeys.list(userId),
    queryFn: () => listLibraryItems(userId),
    enabled: isAuthenticated && userId.length > 0,
  });

  const getCachedItems = useCallback(() => (
    queryClient.getQueryData<Awaited<ReturnType<typeof listLibraryItems>>>(libraryKeys.list(userId)) ?? []
  ), [queryClient, userId]);

  const keepMutation = useMutation({
    mutationFn: (video: VideoAnalysis) => keepVideo(userId, video),
    onSuccess: (items) => {
      queryClient.setQueryData(libraryKeys.list(userId), items);
    },
  });

  const unkeepMutation = useMutation({
    mutationFn: (identifier: string) => {
      const cachedItems = getCachedItems();
      const matchedItem = cachedItems.find((item) => item.id === identifier || item.analysisId === identifier);
      return unkeepVideo(userId, matchedItem?.id ?? identifier);
    },
    onSuccess: (items) => {
      queryClient.setQueryData(libraryKeys.list(userId), items);
    },
    onError: (error) => {
      if (!userId) {
        console.error('Failed to unkeep video:', error);
        return;
      }
      queryClient.invalidateQueries({ queryKey: libraryKeys.list(userId) });
    },
  });

  const check = useCallback((analysisId: string) => {
    if (!userId) return false;
    const cachedItems = getCachedItems();

    if (Array.isArray(cachedItems)) {
      return cachedItems.some((item) => item.analysisId === analysisId);
    }

    void checkKeptVideo(userId, analysisId);
    return false;
  }, [getCachedItems, userId]);

  return {
    items: query.data ?? [],
    hydrated: isAuthenticated && query.isFetched,
    isLoading: query.isLoading,
    add: (video: VideoAnalysis) => keepMutation.mutate(video),
    remove: (libraryItemId: string) => unkeepMutation.mutate(libraryItemId),
    check,
  };
}
