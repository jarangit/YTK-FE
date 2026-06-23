import type {
  AnalysisSummary,
  DetailedExplanation,
  ExampleItem,
  KeyInsight,
  MentalModel,
  ResearchRoadmap,
  VideoAnalysis,
} from '../../analysis/types';
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
  language: string;
  status?: BackendAnalysisStatus;
  summary: string;
  detailedExplanation: Array<{
    topic: string;
    explanation: string;
  }>;
  importantDetails: string[];
  examples: Array<{
    topic: string;
    example: string;
  }>;
  limitations: string[];
  keyInsights: Array<{
    insight: string;
    whyImportant: string;
    mindsetChange: string;
  }>;
  mentalModel: {
    name: string;
    steps: string[];
    description: string;
  } | null;
  practicalTakeaways: string[];
  researchRoadmap: {
    tools: string[];
    trends: string[];
    concepts: string[];
    deepQuestions: string[];
  } | null;
  oneLineSummary: string;
  failureCode?: string | null;
  failureMessage?: string | null;
  createdAt: string;
}

export interface BackendVideoAnalysisResponse {
  id: string;
  analysisId?: string;
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
  analysisId: string;
  status: BackendAnalysisStatus;
  video: VideoAnalysis | null;
  transcript: TranscriptSegment[];
  failureCode?: string;
  failureMessage?: string;
  youtubeUrl?: string;
  language?: AnalysisLanguage;
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

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeDetailedExplanation(value: unknown): DetailedExplanation[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      topic: normalizeText(item.topic),
      explanation: normalizeText(item.explanation),
    }))
    .filter((item) => item.topic || item.explanation);
}

function normalizeExamples(value: unknown): ExampleItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      topic: normalizeText(item.topic),
      example: normalizeText(item.example),
    }))
    .filter((item) => item.topic || item.example);
}

function normalizeKeyInsights(value: unknown): KeyInsight[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      insight: normalizeText(item.insight),
      whyImportant: normalizeText(item.whyImportant),
      mindsetChange: normalizeText(item.mindsetChange),
    }))
    .filter((item) => item.insight || item.whyImportant || item.mindsetChange);
}

function normalizeMentalModel(value: unknown): MentalModel | null {
  if (!value || typeof value !== 'object') return null;
  const model = value as Record<string, unknown>;
  const normalized = {
    name: normalizeText(model.name),
    description: normalizeText(model.description),
    steps: normalizeSummaryList(model.steps),
  };

  return normalized.name || normalized.description || normalized.steps.length ? normalized : null;
}

function normalizeResearchRoadmap(value: unknown): ResearchRoadmap {
  const roadmap = value && typeof value === 'object'
    ? value as Record<string, unknown>
    : {};

  return {
    tools: normalizeSummaryList(roadmap.tools),
    trends: normalizeSummaryList(roadmap.trends),
    concepts: normalizeSummaryList(roadmap.concepts),
    deepQuestions: normalizeSummaryList(roadmap.deepQuestions),
  };
}

function normalizeSummary(analysis?: BackendAnalysisPayload | null): AnalysisSummary {
  const rawSummary = analysis?.summary;

  if (rawSummary && typeof rawSummary === 'object') {
    const legacy = rawSummary as Record<string, unknown>;
    const summary = normalizeText(legacy.bigIdea) || normalizeText(legacy.overview);

    return {
      summary,
      oneLineSummary: summary,
      detailedExplanation: [],
      importantDetails: [],
      examples: [],
      keyInsights: normalizeSummaryList(legacy.keyPoints).map((insight, index) => ({
        insight,
        whyImportant: normalizeSummaryList(legacy.usefulExamples)[index] ?? '',
        mindsetChange: '',
      })),
      mentalModel: null,
      practicalTakeaways: normalizeSummaryList(legacy.thingsToRemember),
      researchRoadmap: normalizeResearchRoadmap(null),
      limitations: [],
    };
  }

  return {
    summary: normalizeText(rawSummary),
    oneLineSummary: normalizeText(analysis?.oneLineSummary),
    detailedExplanation: normalizeDetailedExplanation(analysis?.detailedExplanation),
    importantDetails: normalizeSummaryList(analysis?.importantDetails),
    examples: normalizeExamples(analysis?.examples),
    keyInsights: normalizeKeyInsights(analysis?.keyInsights),
    mentalModel: normalizeMentalModel(analysis?.mentalModel),
    practicalTakeaways: normalizeSummaryList(analysis?.practicalTakeaways),
    researchRoadmap: normalizeResearchRoadmap(analysis?.researchRoadmap),
    limitations: normalizeSummaryList(analysis?.limitations),
  };
}

function normalizeDerivedOutcomes(analysis?: BackendAnalysisPayload | null): string[] {
  if (!analysis) return [];

  const derived = [
    ...normalizeSummaryList(analysis.practicalTakeaways),
    ...normalizeSummaryList(analysis.importantDetails),
    ...normalizeDetailedExplanation(analysis.detailedExplanation).map((item) => item.topic || item.explanation),
  ];

  return Array.from(new Set(derived.filter((item) => item.trim().length > 0))).slice(0, 4);
}

function normalizeTranscriptSegment(segment: BackendTranscriptSegment): TranscriptSegment {
  return {
    startSeconds: parseClockTimeToSeconds(segment.startTime) || ((segment.minute ?? 0) * 60),
    endSeconds: parseClockTimeToSeconds(segment.endTime) || undefined,
    text: typeof segment.text === 'string' ? segment.text : '',
  };
}

export function normalizeVideoResponse(payload: BackendVideoAnalysisResponse): VideoAnalysis {
  const analysisId = payload.analysis?.id ?? payload.analysisId ?? payload.id;
  const language = payload.analysis?.language === 'th' ? 'th' : payload.analysis?.language === 'en' ? 'en' : undefined;

  return {
    id: payload.id,
    analysisId,
    language,
    videoId: payload.youtubeVideoId,
    title: payload.title ?? payload.youtubeUrl,
    channelName: payload.channelName ?? '',
    channelUrl: '',
    duration: formatDuration(payload.duration ?? 0),
    thumbnailUrl: payload.thumbnail ?? '',
    videoUrl: payload.youtubeUrl,
    outcomes: normalizeDerivedOutcomes(payload.analysis),
    summary: normalizeSummary(payload.analysis),
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
      analysisId: findVideoAnalysis(youtubeUrl)?.analysisId ?? mockVideos[0].analysisId,
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
    const mockVideo = mockVideos.find((video) => video.analysisId === analysisId || video.id === analysisId) ?? mockVideos[0];
    return {
      analysisId: mockVideo.analysisId,
      status: 'COMPLETED',
      video: mockVideo,
      transcript: mockVideo.transcript,
      language: mockVideo.language,
    };
  }

  const response = await apiRequest<ApiEnvelope<BackendVideoAnalysisResponse>>(`/videos/analyses/${analysisId}`);
  const payload = response.data;
  const transcript = Array.isArray(payload.transcript)
    ? payload.transcript.map(normalizeTranscriptSegment).filter((segment) => segment.text.length > 0)
    : [];
  const normalizedVideo = hasRenderableVideoData(payload) || payload.status === 'COMPLETED'
    ? normalizeVideoResponse(payload)
    : null;
  const resolvedAnalysisId = payload.analysis?.id ?? payload.analysisId ?? analysisId;
  const analysisStatus = payload.analysis?.status ?? payload.status;
  const failureCode = payload.analysis?.failureCode ?? payload.failureCode ?? undefined;
  const failureMessage = payload.analysis?.failureMessage ?? payload.failureMessage ?? undefined;
  const language = normalizedVideo?.language;

  return {
    analysisId: resolvedAnalysisId,
    status: analysisStatus,
    video: normalizedVideo,
    transcript,
    failureCode,
    failureMessage,
    youtubeUrl: payload.youtubeUrl,
    language,
  };
}

export async function getExampleAnalysis(): Promise<VideoAnalysis> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos[0];
  }

  return apiRequest<VideoAnalysis>('/videos/example-analysis');
}
