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

  const keepMutation = useMutation({
    mutationFn: (video: VideoAnalysis) => keepVideo(userId, video),
    onSuccess: (items) => {
      queryClient.setQueryData(libraryKeys.list(userId), items);
    },
  });

  const unkeepMutation = useMutation({
    mutationFn: (videoId: string) => unkeepVideo(userId, videoId),
    onSuccess: (items) => {
      queryClient.setQueryData(libraryKeys.list(userId), items);
    },
  });

  const check = useCallback((videoId: string) => {
    if (!userId) return false;
    const cachedItems = queryClient.getQueryData<Awaited<ReturnType<typeof listLibraryItems>>>(
      libraryKeys.list(userId),
    );

    if (cachedItems) {
      return cachedItems.some((item) => item.video.id === videoId);
    }

    void checkKeptVideo(userId, videoId);
    return false;
  }, [queryClient, userId]);

  return {
    items: query.data ?? [],
    hydrated: !isAuthenticated || query.isFetched || query.isSuccess,
    isLoading: query.isLoading,
    add: (video: VideoAnalysis) => keepMutation.mutate(video),
    remove: (videoId: string) => unkeepMutation.mutate(videoId),
    check,
  };
}
