import type { AnalysisSummary } from '../../analysis/types';
import type { BackendAnalysisStatus } from '../../result/api/videoAnalysisApi';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockVideos } from '../../result/data/mockVideos';
import type { HistoryItem } from '../types';

interface RawHistoryItem {
  id: string;
  analysisId: string;
  createdAt: string;
  analysis?: RawHistoryAnalysis | null;
  video: {
    id: string;
    youtubeVideoId: string;
    youtubeUrl: string;
    title?: string;
    thumbnail?: string;
    channelName?: string;
  };
}

interface RawHistoryAnalysis {
  id?: string;
  language?: 'en' | 'th';
  status?: BackendAnalysisStatus;
  detailedExplanation?: AnalysisSummary['detailedExplanation'];
  importantDetails?: AnalysisSummary['importantDetails'];
  examples?: AnalysisSummary['examples'];
  keyInsights?: AnalysisSummary['keyInsights'];
  mentalModel?: AnalysisSummary['mentalModel'];
  practicalTakeaways?: AnalysisSummary['practicalTakeaways'];
  researchRoadmap?: AnalysisSummary['researchRoadmap'];
  limitations?: AnalysisSummary['limitations'];
  oneLineSummary?: string;
  summary?: string;
}

interface ApiEnvelope<T> {
  data: T;
}

const emptySummary: AnalysisSummary = {
  summary: '',
  oneLineSummary: '',
  detailedExplanation: [],
  importantDetails: [],
  examples: [],
  keyInsights: [],
  mentalModel: null,
  practicalTakeaways: [],
  researchRoadmap: { concepts: [], tools: [], deepQuestions: [], trends: [] },
  limitations: [],
  worthIt: null,
};

function normalizeHistoryItem(item: RawHistoryItem): HistoryItem {
  const analysis: RawHistoryAnalysis = item.analysis ?? {};

  return {
    id: item.id,
    analysisId: item.analysisId,
    createdAt: item.createdAt,
    status: analysis.status ?? 'COMPLETED',
    language: analysis.language,
    video: {
      id: item.video.id,
      analysisId: item.analysisId,
      language: analysis.language,
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
        detailedExplanation: Array.isArray(analysis.detailedExplanation) ? analysis.detailedExplanation : [],
        importantDetails: Array.isArray(analysis.importantDetails) ? analysis.importantDetails : [],
        examples: Array.isArray(analysis.examples) ? analysis.examples : [],
        keyInsights: Array.isArray(analysis.keyInsights) ? analysis.keyInsights : [],
        mentalModel: analysis.mentalModel ?? null,
        practicalTakeaways: Array.isArray(analysis.practicalTakeaways) ? analysis.practicalTakeaways : [],
        researchRoadmap: {
          ...emptySummary.researchRoadmap,
          ...(analysis.researchRoadmap ?? {}),
        },
        limitations: Array.isArray(analysis.limitations) ? analysis.limitations : [],
      },
    },
  };
}

export async function listVideoHistory(): Promise<HistoryItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos.map((video, index) => ({
      id: `history-${video.id}`,
      analysisId: video.analysisId,
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      status: 'COMPLETED',
      language: video.language,
      video,
    }));
  }

  const response = await apiRequest<RawHistoryItem[] | ApiEnvelope<RawHistoryItem[]>>('/videos/history');
  const items = Array.isArray(response) ? response : response.data;
  return Array.isArray(items) ? items.map(normalizeHistoryItem) : [];
}
