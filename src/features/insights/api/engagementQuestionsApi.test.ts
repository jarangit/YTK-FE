import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EngagementQuestionItem } from '../types';

const apiRequest = vi.fn();

function createQuestion(overrides: Partial<EngagementQuestionItem> = {}): EngagementQuestionItem {
  return {
    question: 'What makes TypeScript different from JavaScript?',
    answer: 'TypeScript adds static typing on top of JavaScript.',
    hook: 'You have been writing JavaScript without a safety net.',
    whyInteresting: 'It reframes TypeScript as a workflow advantage.',
    analysisId: 'analysis-1',
    video: {
      id: 'video-1',
      youtubeVideoId: 'abc123',
      youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
      title: 'TypeScript Crash Course',
      thumbnail: null,
      channelId: 'UC123',
      channelLogo: null,
      channelName: 'Traversy Media',
    },
    ...overrides,
  };
}

async function importEngagementQuestionsApi(useMockApi: boolean) {
  vi.resetModules();

  vi.doMock('../../../shared/api/config', () => ({
    USE_MOCK_API: useMockApi,
    mockDelay: vi.fn(() => Promise.resolve()),
  }));

  vi.doMock('../../../shared/api/httpClient', () => ({
    apiRequest,
  }));

  return import('./engagementQuestionsApi');
}

describe('engagementQuestionsApi', () => {
  beforeEach(() => {
    apiRequest.mockReset();
    vi.restoreAllMocks();
  });

  it('unwraps the GET /engagement-questions response envelope', async () => {
    const item = createQuestion();
    apiRequest.mockResolvedValue({
      data: {
        items: [item],
        nextCursor: 'analysis-1:0',
        hasMore: true,
      },
      timestamp: '2026-07-10T12:00:00.000Z',
    });
    const { listEngagementQuestions } = await importEngagementQuestionsApi(false);

    await expect(listEngagementQuestions()).resolves.toEqual({
      items: [item],
      nextCursor: 'analysis-1:0',
      hasMore: true,
    });
  });

  it('sends keyword, limit, cursor, and random query params', async () => {
    apiRequest.mockResolvedValue({
      data: {
        items: [],
        nextCursor: null,
        hasMore: false,
      },
      timestamp: '2026-07-10T12:00:00.000Z',
    });
    const { listEngagementQuestions } = await importEngagementQuestionsApi(false);

    await listEngagementQuestions({ keyword: ' react ', limit: 60, cursor: 'analysis-2:3', random: true });

    expect(apiRequest).toHaveBeenCalledWith('/engagement-questions', {
      auth: false,
      query: {
        random: true,
        keyword: 'react',
        limit: 50,
        cursor: 'analysis-2:3',
      },
    });
  });

  it('filters and paginates mock questions by keyword', async () => {
    const { listEngagementQuestions } = await importEngagementQuestionsApi(true);

    const firstPage = await listEngagementQuestions({ keyword: 'react', limit: 2 });

    expect(firstPage.items.length).toBeGreaterThan(0);
    expect(firstPage.items.some((item) => item.question.toLowerCase().includes('react'))).toBe(true);
    expect(firstPage.hasMore).toBe(true);

    const secondPage = await listEngagementQuestions({
      keyword: 'react',
      limit: 2,
      cursor: firstPage.nextCursor ?? undefined,
    });

    expect(secondPage.items[0]?.analysisId).not.toBe(firstPage.items[0]?.analysisId);
  });
});
