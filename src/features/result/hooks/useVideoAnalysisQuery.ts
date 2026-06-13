import { useQuery } from '@tanstack/react-query';
import { analyzeVideo } from '../api/videoAnalysisApi';

export const videoAnalysisKeys = {
  all: ['video-analysis'] as const,
  detail: (url: string) => [...videoAnalysisKeys.all, url] as const,
};

export function useVideoAnalysisQuery(url: string) {
  return useQuery({
    queryKey: videoAnalysisKeys.detail(url),
    queryFn: () => analyzeVideo({ url }),
    enabled: url.trim().length > 0,
  });
}
