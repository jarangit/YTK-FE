import { useQuery } from '@tanstack/react-query';
import { getExampleAnalysis } from '../../result/api/videoAnalysisApi';

export function useExampleAnalysisQuery() {
  return useQuery({
    queryKey: ['video-analysis', 'example'],
    queryFn: getExampleAnalysis,
  });
}
