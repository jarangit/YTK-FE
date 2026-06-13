import type { VideoAnalysis } from '../../analysis/types';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { findVideoAnalysis, mockVideos } from '../data/mockVideos';

export interface AnalyzeVideoRequest {
  url: string;
}

export async function analyzeVideo({ url }: AnalyzeVideoRequest): Promise<VideoAnalysis | null> {
  if (USE_MOCK_API) {
    await mockDelay(800);
    return findVideoAnalysis(url) ?? null;
  }

  return apiRequest<VideoAnalysis>('/videos/analyze', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

export async function getExampleAnalysis(): Promise<VideoAnalysis> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos[0];
  }

  return apiRequest<VideoAnalysis>('/videos/example-analysis');
}
