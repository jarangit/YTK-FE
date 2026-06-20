import type { VideoAnalysis } from '../../analysis/types';
import type { TranscriptSegment } from '../../analysis/types';
import { apiRequest } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { findVideoAnalysis, mockVideos } from '../data/mockVideos';

export type AnalysisLanguage = 'en' | 'th';
export type BackendAnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

export interface AnalyzeVideoRequest {
  youtubeUrl: string;
  language: AnalysisLanguage;
}

export interface AnalyzeVideoResponse {
  analysisId: string;
  status: BackendAnalysisStatus;
}

interface BackendTranscriptSegment {
  minute?: number;
  startTime?: string;
  endTime?: string;
  text?: string;
}

interface BackendAnalysisPayload {
  id: string;
  language: AnalysisLanguage;
  outcomes?: unknown[];
  summary?: Record<string, unknown> | null;
  createdAt: string;
}

export interface BackendVideoAnalysisResponse {
  id: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  title?: string;
  thumbnail?: string;
  channelName?: string;
  duration?: number;
  status: BackendAnalysisStatus;
  createdAt: string;
  failureCode?: string;
  failureMessage?: string;
  transcript: BackendTranscriptSegment[];
  analysis: BackendAnalysisPayload | null;
}

export interface VideoAnalysisResult {
  status: BackendAnalysisStatus;
  video: VideoAnalysis | null;
  transcript: TranscriptSegment[];
  failureCode?: string;
  failureMessage?: string;
  youtubeUrl?: string;
}

function hasRenderableVideoData(payload: BackendVideoAnalysisResponse) {
  return Boolean(
    payload.title?.trim().length
    && payload.youtubeUrl?.trim().length
    && payload.analysis,
  );
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function parseClockTimeToSeconds(value?: string) {
  if (!value) return 0;
  const parts = value.split(':').map((part) => Number(part));

  if (parts.some((part) => Number.isNaN(part))) return 0;

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return (minutes * 60) + seconds;
  }

  return parts[0] ?? 0;
}

function normalizeOutcomes(outcomes?: unknown[]) {
  if (!Array.isArray(outcomes)) return [];

  return outcomes
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        return [record.title, record.outcome, record.text, record.description]
          .find((value) => typeof value === 'string' && value.trim().length > 0) as string | undefined;
      }

      return undefined;
    })
    .filter((item): item is string => Boolean(item));
}

function normalizeSummaryList(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        return [record.text, record.title, record.description, record.value]
          .find((entry) => typeof entry === 'string' && entry.trim().length > 0) as string | undefined;
      }

      return undefined;
    })
    .filter((item): item is string => Boolean(item));
}

function normalizeSummary(summary?: Record<string, unknown> | null): VideoAnalysis['summary'] {
  const safeSummary = summary ?? {};

  return {
    bigIdea: typeof safeSummary.bigIdea === 'string'
      ? safeSummary.bigIdea
      : typeof safeSummary.overview === 'string'
        ? safeSummary.overview
        : '',
    keyPoints: normalizeSummaryList(safeSummary.keyPoints),
    usefulExamples: normalizeSummaryList(safeSummary.usefulExamples),
    thingsToRemember: normalizeSummaryList(safeSummary.thingsToRemember),
  };
}

function normalizeTranscriptSegment(segment: BackendTranscriptSegment): TranscriptSegment {
  return {
    startSeconds: parseClockTimeToSeconds(segment.startTime) || ((segment.minute ?? 0) * 60),
    endSeconds: parseClockTimeToSeconds(segment.endTime) || undefined,
    text: typeof segment.text === 'string' ? segment.text : '',
  };
}

export function normalizeVideoResponse(payload: BackendVideoAnalysisResponse): VideoAnalysis {
  return {
    id: payload.id,
    videoId: payload.youtubeVideoId,
    title: payload.title ?? payload.youtubeUrl,
    channelName: payload.channelName ?? '',
    channelUrl: '',
    duration: formatDuration(payload.duration ?? 0),
    thumbnailUrl: payload.thumbnail ?? '',
    videoUrl: payload.youtubeUrl,
    outcomes: normalizeOutcomes(payload.analysis?.outcomes),
    summary: normalizeSummary(payload.analysis?.summary),
    keywords: [],
    transcript: Array.isArray(payload.transcript)
      ? payload.transcript.map(normalizeTranscriptSegment).filter((segment) => segment.text.length > 0)
      : [],
  };
}

export async function getVideoById(videoId: string): Promise<VideoAnalysis | null> {
  if (USE_MOCK_API) {
    await mockDelay();
    const mockVideo = mockVideos.find((video) => video.videoId === videoId || video.id === videoId) ?? null;
    return mockVideo;
  }

  const response = await apiRequest<ApiEnvelope<BackendVideoAnalysisResponse>>(`/videos/${videoId}`);
  const payload = response.data;

  if (!hasRenderableVideoData(payload) && payload.status !== 'COMPLETED') {
    return null;
  }

  return normalizeVideoResponse(payload);
}

export async function analyzeVideo({ youtubeUrl, language }: AnalyzeVideoRequest): Promise<AnalyzeVideoResponse> {
  if (USE_MOCK_API) {
    await mockDelay(800);
    return {
      analysisId: findVideoAnalysis(youtubeUrl)?.id ?? mockVideos[0].id,
      status: 'COMPLETED',
    };
  }

  const response = await apiRequest<ApiEnvelope<AnalyzeVideoResponse>>('/videos/analyze', {
    method: 'POST',
    body: JSON.stringify({ youtubeUrl, language }),
  });

  return response.data;
}

export async function getVideoAnalysisResult(analysisId: string): Promise<VideoAnalysisResult> {
  if (USE_MOCK_API) {
    await mockDelay();
    const mockVideo = mockVideos.find((video) => video.id === analysisId) ?? mockVideos[0];
    return {
      status: 'COMPLETED',
      video: mockVideo,
      transcript: mockVideo.transcript,
    };
  }

  const response = await apiRequest<ApiEnvelope<BackendVideoAnalysisResponse>>(`/videos/${analysisId}`);
  const payload = response.data;
  const transcript = Array.isArray(payload.transcript)
    ? payload.transcript.map(normalizeTranscriptSegment).filter((segment) => segment.text.length > 0)
    : [];

  return {
    status: payload.status,
    video: hasRenderableVideoData(payload) || payload.status === 'COMPLETED'
      ? normalizeVideoResponse(payload)
      : null,
    transcript,
    failureCode: payload.failureCode,
    failureMessage: payload.failureMessage,
    youtubeUrl: payload.youtubeUrl,
  };
}

export async function getExampleAnalysis(): Promise<VideoAnalysis> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos[0];
  }

  return apiRequest<VideoAnalysis>('/videos/example-analysis');
}
