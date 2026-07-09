import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../../shared/i18n';
import HomePage from './HomePage';
import type { FeedItem } from '../feed/types';
import type { EngagementQuestionItem } from '../insights/types';

const useHomeFeaturedAnalysisQueryMock = vi.fn();
const useFeedQueryMock = vi.fn();
const useEngagementQuestionsQueryMock = vi.fn();

vi.mock('./hooks/useHomeFeaturedAnalysisQuery', () => ({
  useHomeFeaturedAnalysisQuery: () => useHomeFeaturedAnalysisQueryMock(),
}));

vi.mock('../feed/hooks/useFeedQuery', () => ({
  useFeedQuery: (...args: unknown[]) => useFeedQueryMock(...args),
}));

vi.mock('../insights/hooks/useEngagementQuestionsQuery', () => ({
  useEngagementQuestionsQuery: (...args: unknown[]) => useEngagementQuestionsQueryMock(...args),
}));

vi.mock('./UrlInputForm', () => ({
  default: () => <form aria-label="url input form" />,
}));

vi.mock('./ExampleAnalysisState', () => ({
  default: () => <section>Example analysis state</section>,
}));

vi.mock('../feed/FeedCard', () => ({
  default: ({ item }: { item: FeedItem }) => <article>{item.id}</article>,
}));

vi.mock('../insights/InsightsQuestionCard', () => ({
  default: ({ item }: { item: EngagementQuestionItem }) => <article>{item.question}</article>,
}));

vi.mock('../../shared/components/atoms/ContentTransition', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function createQuestion(id: string): EngagementQuestionItem {
  return {
    question: `Insight question ${id}`,
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

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useHomeFeaturedAnalysisQueryMock.mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
      refetch: vi.fn(),
    });
    useFeedQueryMock.mockReturnValue({
      data: { pages: [{ items: [] }] },
      isLoading: false,
    });
    useEngagementQuestionsQueryMock.mockReturnValue({
      data: { pages: [{ items: [createQuestion('1'), createQuestion('2'), createQuestion('3')] }] },
      isLoading: false,
    });
  });

  it('renders an Insights preview from random engagement questions', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(useEngagementQuestionsQueryMock).toHaveBeenCalledWith('', 3, true);
    expect(screen.getByText('Questions worth thinking about')).toBeInTheDocument();
    expect(screen.getByText('Insight question 1')).toBeInTheDocument();
    expect(screen.getByText('Insight question 2')).toBeInTheDocument();
    expect(screen.getByText('Insight question 3')).toBeInTheDocument();
  });
});
