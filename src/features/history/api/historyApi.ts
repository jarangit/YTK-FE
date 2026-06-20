import type { AnalysisSummary } from '../../analysis/types';
import type { BackendAnalysisStatus } from '../../result/api/videoAnalysisApi';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockVideos } from '../../result/data/mockVideos';
import type { HistoryItem } from '../types';

interface RawHistoryItem {
  id: string;
  videoId: string;
  createdAt: string;
  video: {
    id: string;
    youtubeVideoId: string;
    youtubeUrl: string;
    title?: string;
    thumbnail?: string;
    channelName?: string;
    status?: BackendAnalysisStatus;
    analysis?: Partial<AnalysisSummary> | null;
  };
}

interface ApiEnvelope<T> {
  data: T;
}

const emptySummary: AnalysisSummary = {
  summary: '',
  oneLineSummary: '',
  keyInsights: [],
  mentalModel: null,
  practicalTakeaways: [],
  researchRoadmap: { concepts: [], tools: [], deepQuestions: [], trends: [] },
};

function normalizeHistoryItem(item: RawHistoryItem): HistoryItem {
  const analysis = item.video.analysis ?? {};

  return {
    id: item.id,
    videoId: item.videoId,
    createdAt: item.createdAt,
    status: item.video.status ?? 'COMPLETED',
    video: {
      id: item.video.id,
      videoId: item.video.youtubeVideoId,
      videoUrl: item.video.youtubeUrl,
      title: item.video.title ?? item.video.youtubeUrl,
      thumbnailUrl: item.video.thumbnail ?? '',
      channelName: item.video.channelName ?? '',
      channelUrl: '',
      duration: '',
      outcomes: [],
      keywords: [],
      transcript: [],
      summary: {
        ...emptySummary,
        ...analysis,
        keyInsights: Array.isArray(analysis.keyInsights) ? analysis.keyInsights : [],
        mentalModel: analysis.mentalModel ?? null,
        practicalTakeaways: Array.isArray(analysis.practicalTakeaways) ? analysis.practicalTakeaways : [],
        researchRoadmap: {
          ...emptySummary.researchRoadmap,
          ...(analysis.researchRoadmap ?? {}),
        },
      },
    },
  };
}

export async function listVideoHistory(): Promise<HistoryItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos.map((video, index) => ({
      id: `history-${video.id}`,
      videoId: video.id,
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      status: 'COMPLETED',
      video,
    }));
  }

  const response = await apiRequest<RawHistoryItem[] | ApiEnvelope<RawHistoryItem[]>>('/videos/history');
  const items = Array.isArray(response) ? response : response.data;
  return Array.isArray(items) ? items.map(normalizeHistoryItem) : [];
}
