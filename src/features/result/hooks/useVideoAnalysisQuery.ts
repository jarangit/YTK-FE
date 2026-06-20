import { useQuery } from '@tanstack/react-query';
import { getVideoAnalysisResult } from '../api/videoAnalysisApi';

export const videoAnalysisKeys = {
  all: ['video-analysis'] as const,
  detail: (videoId: string) => [...videoAnalysisKeys.all, videoId] as const,
};

export function useVideoAnalysisQuery(videoId: string) {
  return useQuery({
    queryKey: videoAnalysisKeys.detail(videoId),
    queryFn: () => getVideoAnalysisResult(videoId),
    enabled: videoId.trim().length > 0,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'PENDING' || status === 'PROCESSING' ? 2500 : false;
    },
  });
}
