import { useQuery } from '@tanstack/react-query';
import { getVideoAnalysisResult } from '../api/videoAnalysisApi';

export const videoAnalysisKeys = {
  all: ['video-analysis'] as const,
  detail: (analysisId: string) => [...videoAnalysisKeys.all, analysisId] as const,
};

export function useVideoAnalysisQuery(analysisId: string) {
  return useQuery({
    queryKey: videoAnalysisKeys.detail(analysisId),
    queryFn: () => getVideoAnalysisResult(analysisId),
    enabled: analysisId.trim().length > 0,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'PENDING' || status === 'PROCESSING' ? 2500 : false;
    },
  });
}
