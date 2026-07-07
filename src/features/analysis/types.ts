export interface TranscriptSegment {
  startSeconds: number;
  endSeconds?: number;
  text: string;
}

export interface AnalysisTimelineItem {
  heading: string;
  whatIsCovered: string;
  importantDetails: string[];
}

export interface ImportantPoint {
  point: string;
  whyItMatters: string;
}

export interface CareerInference {
  likelyRoles: string[];
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
  recommendedTopics: string[];
  personalizedAdvice: string[];
}

export interface EngagementQuestion {
  question: string;
  answer: string;
  hook: string;
  whyInteresting: string;
}

export interface OriginalContext {
  keywords: string[];
  people: string[];
  topics: string[];
}

export interface KeyInsight {
  insight: string;
  whyImportant: string;
  mindsetChange: string;
}

export interface DetailedExplanation {
  topic: string;
  explanation: string;
}

export interface ExampleItem {
  topic: string;
  example: string;
}

export interface MentalModel {
  name: string;
  description: string;
  steps: string[];
}

export interface ResearchRoadmap {
  tools: string[];
  trends: string[];
  concepts: string[];
  deepQuestions: string[];
}

export interface WorthItSummary {
  difficulty: string;
  estimatedValue: string;
  bestFor: string[];
  skipIf: string[];
}

export interface AnalysisSummary {
  summary: string;
  oneLineSummary: string;
  detailedExplanation: DetailedExplanation[];
  importantDetails: string[];
  examples: ExampleItem[];
  keyInsights: KeyInsight[];
  mentalModel: MentalModel | null;
  practicalTakeaways: string[];
  researchRoadmap: ResearchRoadmap;
  limitations: string[];
  worthIt?: WorthItSummary | null;
}

export interface LegacyAnalysisSummary {
  bigIdea: string;
  keyPoints: string[];
  usefulExamples: string[];
  thingsToRemember: string[];
}

export function normalizeLegacySummary(summary: LegacyAnalysisSummary): AnalysisSummary {
  return {
    summary: summary.bigIdea,
    oneLineSummary: summary.bigIdea,
    detailedExplanation: [],
    importantDetails: [],
    examples: [],
    keyInsights: summary.keyPoints.map((insight, index) => ({
      insight,
      whyImportant: summary.usefulExamples[index] ?? '',
      mindsetChange: '',
    })),
    mentalModel: null,
    practicalTakeaways: summary.thingsToRemember,
    researchRoadmap: {
      tools: [],
      trends: [],
      concepts: [],
      deepQuestions: [],
    },
    limitations: [],
    worthIt: null,
  };
}

export interface VideoAnalysis {
  id: string;
  analysisId: string;
  language?: 'en' | 'th';
  videoId: string;
  title: string;
  youtubeUrl?: string;
  channelName: string;
  channelUrl: string;
  channelId?: string;
  channelLogo?: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt?: string;
  outcomes: string[];
  summary: AnalysisSummary;
  keywords: string[];
  overview?: string;
  timeline?: AnalysisTimelineItem[];
  importantPoints?: ImportantPoint[];
  takeaways?: string[];
  careerInference?: CareerInference | null;
  engagementQuestions?: EngagementQuestion[];
  originalContext?: OriginalContext | null;
  transcript: TranscriptSegment[];
  transcriptEn?: TranscriptSegment[];
  transcriptTh?: TranscriptSegment[];
}
