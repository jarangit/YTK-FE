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
