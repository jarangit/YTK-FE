export interface TranscriptSegment {
  startSeconds: number;
  endSeconds?: number;
  text: string;
}

export interface VideoAnalysis {
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
  transcript: TranscriptSegment[];
}
