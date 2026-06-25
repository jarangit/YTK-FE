export const FEED_ITEM_TYPES = ['OUTCOME', 'INSIGHT', 'ACTION', 'SUMMARY'] as const;

export type FeedItemType = typeof FEED_ITEM_TYPES[number];

export type FeedAnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  title: string;
  body: string;
  metadata: Record<string, unknown> | null;
  keywords: string[];
  score: number;
  createdAt: string;
  analysis: {
    id: string;
    language: string;
    status: FeedAnalysisStatus;
    summary?: string;
    createdAt: string;
  };
  video: {
    id: string;
    youtubeVideoId: string;
    youtubeUrl: string;
    title: string | null;
    thumbnail: string | null;
    channelName: string | null;
    duration: number | null;
  };
}

export interface FeedPagePayload {
  items: FeedItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface SaveFeedItemResponse {
  id: string;
}
