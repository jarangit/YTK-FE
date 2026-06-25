import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import '../..//shared/i18n';
import ResultContent from './ResultContent';
import type { VideoAnalysis } from '../analysis/types';

vi.mock('../analysis/KeepAction', () => ({
  default: () => <button type="button">Keep mock</button>,
}));

const video: VideoAnalysis = {
  id: 'row-1',
  analysisId: 'analysis-1',
  language: 'en',
  videoId: 'abc123',
  title: 'Worth it video',
  channelName: '',
  channelUrl: '',
  duration: '',
  thumbnailUrl: '',
  videoUrl: 'https://www.youtube.com/watch?v=abc123',
  outcomes: ['Outcome one', 'Outcome two'],
  keywords: ['keyword'],
  transcript: [
    { startSeconds: 0, text: 'Segment one' },
    { startSeconds: 60, text: 'Segment two' },
    { startSeconds: 120, text: 'Segment three' },
    { startSeconds: 180, text: 'Segment four' },
    { startSeconds: 240, text: 'Segment five' },
  ],
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
        mindsetChange: 'Try this in practice',
      },
    ],
    mentalModel: null,
    practicalTakeaways: ['Takeaway one', 'Takeaway two'],
    researchRoadmap: {
      tools: [],
      trends: [],
      concepts: [],
      deepQuestions: [],
    },
    limitations: [],
    worthIt: {
      difficulty: 'beginner',
      estimatedValue: 'This is useful if you want the big ideas quickly.',
      bestFor: ['Busy learners'],
      skipIf: ['You want deep technical detail'],
    },
  },
};

describe('ResultContent', () => {
  beforeAll(() => {
    localStorage.setItem('youtive_lang', 'en');
  });

  it('renders the worth-it section with best-for and skip-if content', () => {
    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    expect(screen.getByText('Worth your time?')).toBeInTheDocument();
    expect(screen.getByText('Busy learners')).toBeInTheDocument();
    expect(screen.getByText('You want deep technical detail')).toBeInTheDocument();
    expect(screen.getByText(/This is useful if you want the big ideas quickly./)).toBeInTheDocument();
  });

  it('shows action items in the existing takeaways area', () => {
    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    expect(screen.getByText('Action items')).toBeInTheDocument();
    expect(screen.getByText('Takeaway one')).toBeInTheDocument();
    expect(screen.getByText('Takeaway two')).toBeInTheDocument();
  });

  it('renders key insights and context keywords directly on the page', () => {
    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    expect(screen.getByText('Key Insights')).toBeInTheDocument();
    expect(screen.getByText('Insight one')).toBeInTheDocument();
    expect(screen.getByText('How to apply it')).toBeInTheDocument();
    expect(screen.getByText('keyword')).toBeInTheDocument();
  });

  it('renders and expands the transcript', async () => {
    const user = userEvent.setup();

    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Full transcript/i }));
    expect(screen.getByText('Segment one')).toBeInTheDocument();
    expect(screen.queryByText('Segment five')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Show all 5 segments/i }));
    expect(screen.getByText('Segment five')).toBeInTheDocument();
  });
});
