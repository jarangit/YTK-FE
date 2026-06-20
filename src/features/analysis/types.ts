export interface TranscriptSegment {
  startSeconds: number;
  endSeconds?: number;
  text: string;
}

export interface KeyInsight {
  insight: string;
  whyImportant: string;
  mindsetChange: string;
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

export interface AnalysisSummary {
  summary: string;
  oneLineSummary: string;
  keyInsights: KeyInsight[];
  mentalModel: MentalModel | null;
  practicalTakeaways: string[];
  researchRoadmap: ResearchRoadmap;
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
  };
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
  summary: AnalysisSummary;
  keywords: string[];
  transcript: TranscriptSegment[];
}
