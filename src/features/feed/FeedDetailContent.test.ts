import { describe, expect, it } from 'vitest';
import { toVideoAnalysis } from './FeedDetailContent';
import type { FeedItem } from './types';

function createFeedItem(overrides: Partial<FeedItem> = {}): FeedItem {
  return {
    id: 'feed-1',
    type: 'ACTION',
    title: 'Apply the idea',
    body: 'Take one concrete action after watching',
    metadata: null,
    keywords: ['learning'],
    score: 18,
    createdAt: '2026-06-25T14:39:07.059Z',
    analysis: {
      id: 'analysis-1',
      language: 'th',
      status: 'COMPLETED',
      createdAt: '2026-06-25T14:38:57.198Z',
    },
    video: {
      id: 'video-1',
      youtubeVideoId: 'abc123',
      youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
      title: null,
      thumbnail: null,
      channelName: null,
      duration: 305,
    },
    ...overrides,
  };
}

describe('toVideoAnalysis', () => {
  it('handles nullable metadata, optional summary, and numeric duration', () => {
    const result = toVideoAnalysis(createFeedItem());

    expect(result.title).toBe('Apply the idea');
    expect(result.summary.summary).toBe('Take one concrete action after watching');
    expect(result.summary.keyInsights[0]).toEqual({
      insight: 'Take one concrete action after watching',
      whyImportant: '',
      mindsetChange: '',
    });
    expect(result.duration).toBe('5:05');
    expect(result.channelName).toBe('');
    expect(result.thumbnailUrl).toBe('');
  });
});
