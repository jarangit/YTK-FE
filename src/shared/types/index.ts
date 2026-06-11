export interface MockVideo {
  id: string;
  videoId: string;
  title: string;
  channelName: string;
  channelUrl: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  outcomes: string[];
  summary: {
    bigIdea: string;
    keyPoints: string[];
    usefulExamples: string[];
    thingsToRemember: string[];
  };
  keywords: string[];
}

export interface KeptItem {
  video: MockVideo;
  keptAt: string;
}

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
}
