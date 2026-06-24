import type { AnalysisSummary, VideoAnalysis } from '../../analysis/types';
import type { KeptItem } from '../types';
import { apiRequest } from '../../../shared/api/httpClient';

interface ApiEnvelope<T> {
  data: T;
  timestamp?: string;
}

interface RawLibraryItem {
  id: string;
  analysisId: string;
  createdAt: string;
  analysis?: {
    id: string;
    language?: 'en' | 'th';
  } | null;
  video?: Partial<VideoAnalysis> & {
    id?: string;
    analysisId?: string;
    videoId?: string;
    youtubeVideoId?: string;
    title?: string;
    thumbnail?: string;
    thumbnailUrl?: string;
    channelName?: string;
    channelUrl?: string;
    duration?: string;
    videoUrl?: string;
    youtubeUrl?: string;
    summary?: Partial<AnalysisSummary> | null;
  } | null;
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
};

function normalizeSummary(summary?: Partial<AnalysisSummary> | null): AnalysisSummary {
  return {
    ...emptySummary,
    ...summary,
    detailedExplanation: Array.isArray(summary?.detailedExplanation) ? summary.detailedExplanation : [],
    importantDetails: Array.isArray(summary?.importantDetails) ? summary.importantDetails : [],
    examples: Array.isArray(summary?.examples) ? summary.examples : [],
    keyInsights: Array.isArray(summary?.keyInsights) ? summary.keyInsights : [],
    mentalModel: summary?.mentalModel ?? null,
    practicalTakeaways: Array.isArray(summary?.practicalTakeaways) ? summary.practicalTakeaways : [],
    researchRoadmap: {
      ...emptySummary.researchRoadmap,
      ...(summary?.researchRoadmap ?? {}),
    },
    limitations: Array.isArray(summary?.limitations) ? summary.limitations : [],
  };
}

function normalizeVideo(video: RawLibraryItem['video'], analysisId: string, language?: 'en' | 'th'): VideoAnalysis {
  return {
    id: video?.id ?? analysisId,
    analysisId,
    language: language ?? video?.language,
    videoId: video?.videoId ?? video?.youtubeVideoId ?? '',
    title: video?.title ?? video?.videoUrl ?? video?.youtubeUrl ?? '',
    channelName: video?.channelName ?? '',
    channelUrl: video?.channelUrl ?? '',
    duration: video?.duration ?? '',
    thumbnailUrl: video?.thumbnailUrl ?? video?.thumbnail ?? '',
    videoUrl: video?.videoUrl ?? video?.youtubeUrl ?? '',
    outcomes: Array.isArray(video?.outcomes) ? video.outcomes : [],
    summary: normalizeSummary(video?.summary),
    keywords: Array.isArray(video?.keywords) ? video.keywords : [],
    transcript: Array.isArray(video?.transcript) ? video.transcript : [],
  };
}

function normalizeLibraryItem(item: RawLibraryItem): KeptItem {
  const language = item.analysis?.language ?? item.video?.language;

  return {
    id: item.id,
    analysisId: item.analysisId,
    createdAt: item.createdAt,
    language,
    video: normalizeVideo(item.video, item.analysisId, language),
  };
}

export async function listLibraryItems(userId: string): Promise<KeptItem[]> {
  const response = await apiRequest<RawLibraryItem[] | ApiEnvelope<RawLibraryItem[]>>('/library', {
    query: { userId },
  });
  const items = Array.isArray(response) ? response : response.data;
  return Array.isArray(items) ? items.map(normalizeLibraryItem) : [];
}

export async function keepVideo(userId: string, video: VideoAnalysis): Promise<KeptItem[]> {
  const response = await apiRequest<RawLibraryItem | ApiEnvelope<RawLibraryItem>>('/library/keep', {
    method: 'POST',
    body: JSON.stringify({ analysisId: video.analysisId }),
  });
  const keptItem = normalizeLibraryItem('data' in response ? response.data : response);
  return [keptItem, ...await listLibraryItems(userId).then((items) => items.filter((item) => item.id !== keptItem.id))];
}

export async function unkeepVideo(userId: string, libraryItemId: string): Promise<KeptItem[]> {
  await apiRequest(`/library/${libraryItemId}`, {
    method: 'DELETE',
    query: { userId },
  });
  return listLibraryItems(userId);
}

export async function checkKeptVideo(userId: string, analysisId: string): Promise<boolean> {
  return listLibraryItems(userId).then((items) => items.some((item) => item.analysisId === analysisId));
}
