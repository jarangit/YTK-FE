import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../../shared/i18n';
import ResultWaitingQuestions from './ResultWaitingQuestions';
import type { EngagementQuestionItem } from '../insights/types';

const useEngagementQuestionsQueryMock = vi.fn();

vi.mock('../insights/hooks/useEngagementQuestionsQuery', () => ({
  useEngagementQuestionsQuery: (...args: unknown[]) => useEngagementQuestionsQueryMock(...args),
}));

vi.mock('../insights/InsightsQuestionCard', () => ({
  default: ({ item }: { item: EngagementQuestionItem }) => <article>{item.question}</article>,
}));

function createQuestion(id: string): EngagementQuestionItem {
  return {
    question: `Question ${id}`,
    answer: `Answer ${id}`,
    hook: `Hook ${id}`,
    whyInteresting: `Why ${id}`,
    analysisId: `analysis-${id}`,
    video: {
      id: `video-${id}`,
      youtubeVideoId: `youtube-${id}`,
      youtubeUrl: `https://www.youtube.com/watch?v=youtube-${id}`,
      title: `Video ${id}`,
      thumbnail: null,
      channelId: `channel-${id}`,
      channelLogo: null,
      channelName: `Channel ${id}`,
    },
  };
}

describe('ResultWaitingQuestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads random questions while the result is waiting', () => {
    useEngagementQuestionsQueryMock.mockReturnValue({
      data: { pages: [{ items: [createQuestion('1')], nextCursor: null, hasMore: false }] },
      isLoading: false,
      isError: false,
    });

    render(<ResultWaitingQuestions />);

    expect(useEngagementQuestionsQueryMock).toHaveBeenCalledWith('', 10, true);
    expect(screen.getByText('Analyzing your video')).toBeInTheDocument();
    expect(screen.getByText('This analysis can take a little longer than it should.')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
  });

  it('shows a lightweight loading state for waiting questions', () => {
    useEngagementQuestionsQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<ResultWaitingQuestions />);

    expect(screen.getByText('Picking a few interesting questions for you...')).toBeInTheDocument();
  });
});
