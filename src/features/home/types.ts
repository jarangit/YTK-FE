export type AnalyticsPeriod = '24h' | '7d' | '30d';

export type AnalyticsStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface AnalyticsItem {
  videoId: string;
  viewCount: number;
  rank: number;
  video: {
    id: string;
    youtubeVideoId: string;
    youtubeUrl: string;
    title: string | null;
    thumbnail: string | null;
    channelName: string | null;
    duration: number | null;
    publishedAt: string | null;
  } | null;
  analysis: {
    id: string;
    language: string;
    status: AnalyticsStatus;
    summary: string | null;
    createdAt: string;
  } | null;
}

export interface HomeFeaturedAnalysis {
  analysisId: string;
  rank: number;
  viewCount: number;
  title: string;
  channelName: string;
  duration: string;
  thumbnailUrl: string;
  summary: string;
}
