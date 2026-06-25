import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import '../../shared/i18n';
import FeedDetailContent from './FeedDetailContent';
import type { FeedItem } from './types';
import type { VideoAnalysis } from '../analysis/types';

const useVideoAnalysisQueryMock = vi.fn();

vi.mock('../result/hooks/useVideoAnalysisQuery', () => ({
  useVideoAnalysisQuery: (...args: unknown[]) => useVideoAnalysisQueryMock(...args),
}));

const item: FeedItem = {
  id: 'feed-1',
  type: 'INSIGHT',
  title: 'Feed title',
  body: 'Feed body',
  metadata: null,
  keywords: ['keyword'],
  score: 10,
  createdAt: '2026-06-25T14:39:07.059Z',
  analysis: {
    id: 'analysis-1',
    language: 'en',
    status: 'COMPLETED',
    summary: 'Feed summary',
    createdAt: '2026-06-25T14:38:57.198Z',
  },
  video: {
    id: 'video-1',
    youtubeVideoId: 'abc123',
    youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
    title: 'Video title',
    thumbnail: 'https://img.youtube.com/vi/abc123/hqdefault.jpg',
    channelName: 'Channel',
    duration: 300,
  },
};

const video: VideoAnalysis = {
  id: 'video-1',
  analysisId: 'analysis-1',
  language: 'en',
  videoId: 'abc123',
  title: 'Video title',
  channelName: 'Channel',
  channelUrl: '',
  duration: '5:00',
  thumbnailUrl: 'https://img.youtube.com/vi/abc123/hqdefault.jpg',
  videoUrl: 'https://www.youtube.com/watch?v=abc123',
  outcomes: ['Outcome one'],
  keywords: ['keyword'],
  transcript: [],
  summary: {
    summary: 'Full overview',
    oneLineSummary: 'Fast summary',
    detailedExplanation: [],
    importantDetails: [],
    examples: [],
    keyInsights: [
      {
        insight: 'Insight one',
        whyImportant: 'Because it matters',
        mindsetChange: 'Try this',
      },
    ],
    mentalModel: null,
    practicalTakeaways: ['Takeaway one'],
    researchRoadmap: {
      tools: [],
      trends: [],
      concepts: [],
      deepQuestions: [],
    },
    limitations: [],
    worthIt: null,
  },
};

describe('FeedDetailContent', () => {
  beforeAll(() => {
    localStorage.setItem('youtive_lang', 'en');
  });

  it('queries full analysis by feed analysis id and renders result-like sections', () => {
    useVideoAnalysisQueryMock.mockReturnValue({
      data: {
        analysisId: 'analysis-1',
        status: 'COMPLETED',
        video,
        transcript: [],
      },
      isLoading: false,
      isError: false,
    });

    render(
      <FeedDetailContent
        item={item}
        onSaveFeedItem={() => {}}
      />,
    );

    expect(useVideoAnalysisQueryMock).toHaveBeenCalledWith('analysis-1');
    expect(screen.getByText('Action items')).toBeInTheDocument();
    expect(screen.getByText('Key Insights')).toBeInTheDocument();
    expect(screen.getByText('keyword')).toBeInTheDocument();
    expect(screen.queryByText('Full transcript')).not.toBeInTheDocument();
  });

  it('renders save action on the preview area and triggers feed save', async () => {
    const user = userEvent.setup();
    const onSaveFeedItem = vi.fn();

    useVideoAnalysisQueryMock.mockReturnValue({
      data: {
        analysisId: 'analysis-1',
        status: 'COMPLETED',
        video,
        transcript: [],
      },
      isLoading: false,
      isError: false,
    });

    render(
      <FeedDetailContent
        item={item}
        onSaveFeedItem={onSaveFeedItem}
      />,
    );

    await user.click(screen.getByRole('button', { name: /keep/i }));
    expect(onSaveFeedItem).toHaveBeenCalledTimes(1);
  });
});
