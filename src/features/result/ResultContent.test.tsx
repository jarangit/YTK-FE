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
  channelName: 'Channel name',
  channelUrl: '',
  duration: '',
  thumbnailUrl: '',
  videoUrl: 'https://www.youtube.com/watch?v=abc123',
  channelLogo: 'https://example.com/channel-logo.jpg',
  outcomes: ['Outcome one', 'Outcome two'],
  keywords: ['keyword'],
  overview: 'Full overview',
  timeline: [
    {
      heading: 'First section',
      whatIsCovered: 'This section introduces the main idea.',
      importantDetails: ['Detail one', 'Detail two'],
    },
  ],
  importantPoints: [
    {
      point: 'Insight one',
      whyItMatters: 'Because it matters',
    },
  ],
  takeaways: ['Takeaway one', 'Takeaway two'],
  careerInference: {
    likelyRoles: ['Product manager'],
    confidence: 'medium',
    reasoning: 'The speaker focuses on product decision making.',
    recommendedTopics: ['User interviews'],
    personalizedAdvice: ['Practice summarizing customer pain in one sentence.'],
  },
  engagementQuestions: [
    {
      question: 'What makes this insight useful?',
      answer: 'It turns the lesson into a reusable mental prompt.',
      hook: 'One small framing change can improve your next interview.',
      whyInteresting: 'It connects theory to a concrete action the user can try next.',
    },
  ],
  originalContext: {
    keywords: ['keyword'],
    people: ['Jane Doe'],
    topics: ['product discovery'],
  },
  transcript: [
    { startSeconds: 0, text: 'Segment one' },
    { startSeconds: 60, text: 'Segment two' },
    { startSeconds: 120, text: 'Segment three' },
    { startSeconds: 180, text: 'Segment four' },
    { startSeconds: 240, text: 'Segment five' },
  ],
  summary: {
    summary: 'Full overview',
    oneLineSummary: 'Full overview',
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
    worthIt: null,
  },
};

describe('ResultContent', () => {
  beforeAll(() => {
    localStorage.setItem('youtive_lang', 'en');
  });

  it('renders the new timeline and engagement sections', () => {
    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    expect(screen.getAllByText('Timeline').length).toBeGreaterThan(0);
    expect(screen.getByText('First section')).toBeInTheDocument();
    expect(screen.getAllByText('Engagement questions').length).toBeGreaterThan(0);
    expect(screen.getByText('One small framing change can improve your next interview.')).toBeInTheDocument();
  });

  it('renders career inference section', () => {
    render(
      <ResultContent
        video={video}
        onKeep={() => {}}
        onRemove={() => {}}
        initiallyKept={false}
      />,
    );

    expect(screen.getAllByText('For this career path').length).toBeGreaterThan(0);
    expect(screen.getByText('Product manager')).toBeInTheDocument();
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
