import type { VideoAnalysis } from '../analysis/types';
import type { BackendAnalysisStatus } from '../result/api/videoAnalysisApi';

export interface HistoryItem {
  id: string;
  videoId: string;
  createdAt: string;
  status: BackendAnalysisStatus;
  video: VideoAnalysis;
}
