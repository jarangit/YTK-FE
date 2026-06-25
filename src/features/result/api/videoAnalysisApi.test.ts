import { describe, expect, it } from 'vitest';
import { normalizeVideoResponse, type BackendVideoAnalysisResponse } from './videoAnalysisApi';

function createPayload(overrides: Partial<BackendVideoAnalysisResponse> = {}): BackendVideoAnalysisResponse {
  return {
    id: 'video-row-1',
    analysisId: 'analysis-1',
    youtubeVideoId: 'abc123',
    youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
    title: 'Test title',
    thumbnail: 'https://img.youtube.com/vi/abc123/maxresdefault.jpg',
    channelName: 'Test channel',
    duration: 305,
    status: 'COMPLETED',
    createdAt: '2026-06-25T10:40:08.423Z',
    transcript: [
      { startTime: '0:00', endTime: '0:30', text: 'Intro' },
      { minute: 1, text: 'Main point' },
    ],
    analysis: {
      id: 'analysis-1',
      language: 'th',
      status: 'COMPLETED',
      summary: 'Main summary',
      worthIt: {
        difficulty: 'beginner',
        estimatedValue: 'Helpful for long-term thinking',
        bestFor: ['Beginners'],
        skipIf: ['Advanced practitioners'],
      },
      learningOutcomes: ['Understand compounding', 'Recognize the role of luck'],
      detailedExplanation: [],
      importantDetails: [],
      examples: [],
      limitations: [],
      keyInsights: [
        {
          insight: 'Wealth takes time',
          whyImportant: 'Compounding needs patience',
          mindsetChange: '',
          howToApply: 'Invest consistently over time',
        },
      ],
      mentalModel: null,
      actionItems: ['Start early', 'Lower your expectations'],
      practicalTakeaways: ['Legacy fallback takeaway'],
      researchRoadmap: {
        tools: [],
        trends: [],
        concepts: [],
        deepQuestions: [],
      },
      oneLineSummary: 'A quick lesson on long-term investing',
      originalContext: {
        keywords: ['investing', 'luck'],
      },
      failureCode: null,
      failureMessage: null,
      createdAt: '2026-06-25T10:45:13.689Z',
    },
    ...overrides,
  };
}

describe('normalizeVideoResponse', () => {
  it('maps the new analysis payload into the existing UI model', () => {
    const normalized = normalizeVideoResponse(createPayload());

    expect(normalized.outcomes).toEqual([
      'Understand compounding',
      'Recognize the role of luck',
    ]);
    expect(normalized.summary.practicalTakeaways).toEqual([
      'Start early',
      'Lower your expectations',
    ]);
    expect(normalized.summary.keyInsights[0]).toMatchObject({
      insight: 'Wealth takes time',
      whyImportant: 'Compounding needs patience',
      mindsetChange: 'Invest consistently over time',
    });
    expect(normalized.summary.worthIt).toEqual({
      difficulty: 'beginner',
      estimatedValue: 'Helpful for long-term thinking',
      bestFor: ['Beginners'],
      skipIf: ['Advanced practitioners'],
    });
    expect(normalized.keywords).toEqual(['investing', 'luck']);
    expect(normalized.transcript).toEqual([
      { startSeconds: 0, endSeconds: 30, text: 'Intro' },
      { startSeconds: 60, endSeconds: undefined, text: 'Main point' },
    ]);
  });

  it('renders gracefully when optional video metadata is missing', () => {
    const normalized = normalizeVideoResponse(createPayload({
      title: undefined,
      thumbnail: undefined,
      channelName: undefined,
      duration: undefined,
    }));

    expect(normalized.title).toBe('https://www.youtube.com/watch?v=abc123');
    expect(normalized.thumbnailUrl).toBe('');
    expect(normalized.channelName).toBe('');
    expect(normalized.duration).toBe('0:00');
  });

  it('returns a null worth-it section when the payload is empty', () => {
    const normalized = normalizeVideoResponse(createPayload({
      analysis: {
        ...createPayload().analysis!,
        worthIt: {
          difficulty: '',
          estimatedValue: '',
          bestFor: [],
          skipIf: [],
        },
      },
    }));

    expect(normalized.summary.worthIt).toBeNull();
  });

  it('keeps legacy practical takeaways when action items are not provided', () => {
    const normalized = normalizeVideoResponse(createPayload({
      analysis: {
        ...createPayload().analysis!,
        actionItems: undefined,
        learningOutcomes: undefined,
      },
    }));

    expect(normalized.summary.practicalTakeaways).toEqual(['Legacy fallback takeaway']);
    expect(normalized.outcomes).toEqual(['Legacy fallback takeaway']);
  });
});
