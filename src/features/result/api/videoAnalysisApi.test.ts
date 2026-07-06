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
      overview: 'Main summary',
      timeline: [
        {
          heading: 'Core lesson',
          whatIsCovered: 'The speaker explains why long-term investing needs patience.',
          importantDetails: ['Compounding is slow at first', 'Consistency matters more than perfect timing'],
        },
      ],
      importantPoints: [
        {
          point: 'Wealth takes time',
          whyItMatters: 'Compounding needs patience',
        },
      ],
      takeaways: ['Start early', 'Lower your expectations'],
      careerInference: {
        likelyRoles: ['Investor'],
        confidence: 'medium',
        reasoning: 'The transcript focuses on personal finance habits.',
        recommendedTopics: ['Asset allocation'],
        personalizedAdvice: ['Invest consistently over time'],
      },
      engagementQuestions: [
        {
          question: 'Why does long-term investing feel slow?',
          answer: 'Because the early phase of compounding looks small before momentum builds.',
          hook: 'The boring middle is where returns are built.',
          whyInteresting: 'It reframes patience as part of the mechanism, not a side effect.',
        },
      ],
      originalContext: {
        keywords: ['investing', 'luck'],
        people: [],
        topics: ['personal finance'],
      },
      failureCode: null,
      failureMessage: null,
      createdAt: '2026-06-25T10:45:13.689Z',
    },
    ...overrides,
  };
}

describe('normalizeVideoResponse', () => {
  it('maps the new analysis payload into the result UI model', () => {
    const normalized = normalizeVideoResponse(createPayload());

    expect(normalized.outcomes).toEqual([
      'Start early',
      'Lower your expectations',
    ]);
    expect(normalized.takeaways).toEqual([
      'Start early',
      'Lower your expectations',
    ]);
    expect(normalized.importantPoints?.[0]).toMatchObject({
      point: 'Wealth takes time',
      whyItMatters: 'Compounding needs patience',
    });
    expect(normalized.timeline?.[0]).toMatchObject({
      heading: 'Core lesson',
      whatIsCovered: 'The speaker explains why long-term investing needs patience.',
    });
    expect(normalized.careerInference?.recommendedTopics).toEqual(['Asset allocation']);
    expect(normalized.engagementQuestions?.[0].hook).toBe('The boring middle is where returns are built.');
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

    expect(normalized.title).toBe('Untitled video');
    expect(normalized.thumbnailUrl).toBe('');
    expect(normalized.channelName).toBe('');
    expect(normalized.duration).toBe('0:00');
  });

  it('returns null for optional inference blocks when the payload is empty', () => {
    const normalized = normalizeVideoResponse(createPayload({
      analysis: {
        ...createPayload().analysis!,
        careerInference: {
          likelyRoles: [],
          confidence: 'low',
          reasoning: '',
          recommendedTopics: [],
          personalizedAdvice: [],
        },
      },
    }));

    expect(normalized.careerInference).toBeNull();
  });

  it('derives outcomes from the remaining analysis content when takeaways are not provided', () => {
    const normalized = normalizeVideoResponse(createPayload({
      analysis: {
        ...createPayload().analysis!,
        takeaways: undefined,
      },
    }));

    expect(normalized.takeaways).toEqual([]);
    expect(normalized.outcomes).toEqual([
      'Wealth takes time',
      'Core lesson',
      'The speaker explains why long-term investing needs patience.',
      'Compounding is slow at first',
    ]);
  });

  it('prefers transcript entries for the active language when transcript is keyed by language', () => {
    const normalized = normalizeVideoResponse(createPayload({
      transcript: {
        th: [{ startTime: '0:05', text: 'สวัสดี' }],
        en: [{ startTime: '0:01', text: 'Hello' }],
      },
    }));

    expect(normalized.transcript).toEqual([
      { startSeconds: 5, endSeconds: undefined, text: 'สวัสดี' },
    ]);
  });
});
