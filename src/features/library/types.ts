import type { VideoAnalysis } from '../analysis/types';

export interface KeptItem {
  id: string;
  analysisId: string;
  createdAt: string;
  video: VideoAnalysis;
  language?: 'en' | 'th';
}
