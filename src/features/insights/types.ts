export interface EngagementQuestionVideo {
  id: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  title: string | null;
  thumbnail: string | null;
  channelId: string | null;
  channelLogo: string | null;
  channelName: string | null;
}

export interface EngagementQuestionItem {
  question: string;
  answer: string;
  hook: string;
  whyInteresting: string;
  analysisId: string;
  video: EngagementQuestionVideo;
}

export interface EngagementQuestionsPagePayload {
  items: EngagementQuestionItem[];
  nextCursor: string | null;
  hasMore: boolean;
}
