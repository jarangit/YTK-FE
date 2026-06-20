import type { LegacyAnalysisSummary } from '../analysis/types';

export interface FeedItem {
  id: string;
  title: string;
  channelName: string;
  channelUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  topic: string;
  summaryCount: number;
  likes: number;
  savedCount: number;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  outcomes: string[];
  summary: LegacyAnalysisSummary;
}
