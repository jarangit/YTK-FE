import type {
  AnalysisSummary,
  AnalysisTimelineItem,
  CareerInference,
  EngagementQuestion,
  ImportantPoint,
  OriginalContext,
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
   overview?: string | null;
   timeline?: Array<{
     heading?: string | null;
     whatIsCovered?: string | null;
     importantDetails?: string[] | null;
   }> | null;
   importantPoints?: Array<{
     point?: string | null;
     whyItMatters?: string | null;
   }> | null;
   takeaways?: string[] | null;
   careerInference?: {
     likelyRoles?: string[] | null;
     confidence?: 'low' | 'medium' | 'high' | null;
     reasoning?: string | null;
     recommendedTopics?: string[] | null;
     personalizedAdvice?: string[] | null;
   } | null;
   engagementQuestions?: Array<{
     question?: string | null;
     answer?: string | null;
     hook?: string | null;
     whyInteresting?: string | null;
   }> | null;
   originalContext?: {
     keywords?: string[];
     people?: string[];
     topics?: string[];
   } | null;
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
  channelId?: string;
  channelLogo?: string;
  channelName?: string;
  duration?: number;
  publishedAt?: string;
  status: BackendAnalysisStatus;
  createdAt: string;
  failureCode?: string;
  failureMessage?: string;
  transcript?: BackendTranscriptSegment[] | {
    en?: BackendTranscriptSegment[] | null;
    th?: BackendTranscriptSegment[] | null;
  } | null;
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

export function formatDuration(totalSeconds: number) {
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

function normalizeStringList(value: unknown) {
  return normalizeSummaryList(value);
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeSummary(analysis?: BackendAnalysisPayload | null): AnalysisSummary {
  const overview = normalizeText(analysis?.overview);
  const keyInsights = normalizeImportantPoints(analysis?.importantPoints).map((item) => ({
    insight: item.point,
    whyImportant: item.whyItMatters,
    mindsetChange: '',
  }));
  const detailedExplanation = normalizeTimeline(analysis?.timeline).map((item) => ({
    topic: item.heading,
    explanation: item.whatIsCovered,
  })).filter((item) => item.topic || item.explanation);
  const importantDetails = normalizeTimeline(analysis?.timeline)
    .flatMap((item) => item.importantDetails)
    .filter((item, index, array) => array.indexOf(item) === index);
  const practicalTakeaways = normalizeSummaryList(analysis?.takeaways);

  return {
    summary: overview,
    oneLineSummary: overview,
    detailedExplanation,
    importantDetails,
    examples: [],
    keyInsights,
    mentalModel: null,
    practicalTakeaways,
    researchRoadmap: { tools: [], trends: [], concepts: [], deepQuestions: [] },
    limitations: [],
    worthIt: null,
  };
}

function normalizeDerivedOutcomes(analysis?: BackendAnalysisPayload | null): string[] {
  if (!analysis) return [];

  const derived = [
    ...normalizeSummaryList(analysis.takeaways),
    ...normalizeImportantPoints(analysis.importantPoints).map((item) => item.point || item.whyItMatters),
    ...normalizeTimeline(analysis.timeline).flatMap((item) => [item.heading, item.whatIsCovered, ...item.importantDetails]),
    ...normalizeCareerInference(analysis.careerInference)?.personalizedAdvice ?? [],
  ];

  return Array.from(new Set(derived.filter((item) => item.trim().length > 0))).slice(0, 4);
}

function normalizeTimeline(value: unknown): AnalysisTimelineItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      heading: normalizeText(item.heading),
      whatIsCovered: normalizeText(item.whatIsCovered),
      importantDetails: normalizeSummaryList(item.importantDetails),
    }))
    .filter((item) => item.heading || item.whatIsCovered || item.importantDetails.length > 0);
}

function normalizeImportantPoints(value: unknown): ImportantPoint[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      point: normalizeText(item.point),
      whyItMatters: normalizeText(item.whyItMatters),
    }))
    .filter((item) => item.point || item.whyItMatters);
}

function normalizeCareerInference(value: unknown): CareerInference | null {
  if (!value || typeof value !== 'object') return null;

  const careerInference = value as Record<string, unknown>;
  const confidence = careerInference.confidence === 'low'
    || careerInference.confidence === 'medium'
    || careerInference.confidence === 'high'
    ? careerInference.confidence
    : 'low';
  const normalized: CareerInference = {
    likelyRoles: normalizeStringList(careerInference.likelyRoles),
    confidence,
    reasoning: normalizeText(careerInference.reasoning),
    recommendedTopics: normalizeStringList(careerInference.recommendedTopics),
    personalizedAdvice: normalizeStringList(careerInference.personalizedAdvice),
  };

  return normalized.likelyRoles.length > 0
    || normalized.reasoning
    || normalized.recommendedTopics.length > 0
    || normalized.personalizedAdvice.length > 0
    ? normalized
    : null;
}

function normalizeEngagementQuestions(value: unknown): EngagementQuestion[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map((item) => ({
      question: normalizeText(item.question),
      answer: normalizeText(item.answer),
      hook: normalizeText(item.hook),
      whyInteresting: normalizeText(item.whyInteresting),
    }))
    .filter((item) => item.question || item.answer || item.hook || item.whyInteresting);
}

function normalizeOriginalContext(value: unknown): OriginalContext | null {
  if (!value || typeof value !== 'object') return null;

  const context = value as Record<string, unknown>;
  const normalized: OriginalContext = {
    keywords: normalizeStringList(context.keywords),
    people: normalizeStringList(context.people),
    topics: normalizeStringList(context.topics),
  };

  return normalized.keywords.length > 0 || normalized.people.length > 0 || normalized.topics.length > 0
    ? normalized
    : null;
}

function extractTranscriptByLanguage(
  transcript: BackendVideoAnalysisResponse['transcript'],
  language?: VideoAnalysis['language'],
) {
  if (Array.isArray(transcript)) return transcript;
  if (!transcript || typeof transcript !== 'object') return [];

  const preferred = language ? transcript[language] : undefined;
  const fallback = transcript.en ?? transcript.th ?? [];

  return Array.isArray(preferred) ? preferred : Array.isArray(fallback) ? fallback : [];
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
  const normalizedSummary = normalizeSummary(payload.analysis);
  const overview = normalizeText(payload.analysis?.overview);
  const timeline = normalizeTimeline(payload.analysis?.timeline);
  const importantPoints = normalizeImportantPoints(payload.analysis?.importantPoints);
  const takeaways = normalizeSummaryList(payload.analysis?.takeaways);
  const careerInference = normalizeCareerInference(payload.analysis?.careerInference);
  const engagementQuestions = normalizeEngagementQuestions(payload.analysis?.engagementQuestions);
  const originalContext = normalizeOriginalContext(payload.analysis?.originalContext);
  const title = payload.title?.trim() || 'Untitled video';
  const outcomes = takeaways.length > 0 ? takeaways : normalizeDerivedOutcomes(payload.analysis);
  const transcript = extractTranscriptByLanguage(payload.transcript, language)
    .map(normalizeTranscriptSegment)
    .filter((segment) => segment.text.length > 0);

  return {
    id: payload.id,
    analysisId,
    language,
    videoId: payload.youtubeVideoId,
    title,
    youtubeUrl: payload.youtubeUrl,
    channelName: payload.channelName ?? '',
    channelUrl: '',
    channelId: payload.channelId,
    channelLogo: payload.channelLogo,
    duration: formatDuration(payload.duration ?? 0),
    thumbnailUrl: payload.thumbnail ?? '',
    videoUrl: payload.youtubeUrl,
    publishedAt: payload.publishedAt ?? undefined,
    outcomes,
    summary: normalizedSummary,
    keywords: originalContext?.keywords ?? [],
    overview,
    timeline,
    importantPoints,
    takeaways,
    careerInference,
    engagementQuestions,
    originalContext,
    transcript,
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
  const language = payload.analysis?.language === 'th' ? 'th' : payload.analysis?.language === 'en' ? 'en' : undefined;
  const transcript = extractTranscriptByLanguage(payload.transcript, language)
    .map(normalizeTranscriptSegment)
    .filter((segment) => segment.text.length > 0);
  const normalizedVideo = hasRenderableVideoData(payload) || payload.status === 'COMPLETED'
    ? normalizeVideoResponse(payload)
    : null;
  const resolvedAnalysisId = payload.analysis?.id ?? payload.analysisId ?? analysisId;
  const analysisStatus = payload.analysis?.status ?? payload.status;
  const failureCode = payload.analysis?.failureCode ?? payload.failureCode ?? undefined;
  const failureMessage = payload.analysis?.failureMessage ?? payload.failureMessage ?? undefined;
  const resolvedLanguage = normalizedVideo?.language ?? language;

  return {
    analysisId: resolvedAnalysisId,
    status: analysisStatus,
    video: normalizedVideo,
    transcript,
    failureCode,
    failureMessage,
    youtubeUrl: payload.youtubeUrl,
    language: resolvedLanguage,
  };
}

export async function getExampleAnalysis(): Promise<VideoAnalysis> {
  if (USE_MOCK_API) {
    await mockDelay();
    return mockVideos[0];
  }

  return apiRequest<VideoAnalysis>('/videos/example-analysis');
}
