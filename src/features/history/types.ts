import type { VideoAnalysis } from '../analysis/types';
import type { BackendAnalysisStatus } from '../result/api/videoAnalysisApi';

export interface HistoryItem {
  id: string;
  analysisId: string;
  createdAt: string;
  status: BackendAnalysisStatus;
  language?: 'en' | 'th';
  video: VideoAnalysis;
}
