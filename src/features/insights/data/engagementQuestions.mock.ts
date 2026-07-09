import type { EngagementQuestionItem } from '../types';

const sources = [
  {
    question: 'What makes TypeScript different from JavaScript?',
    answer: 'TypeScript adds static typing on top of JavaScript, which helps catch mistakes before the code runs.',
    hook: 'You have been writing JavaScript without a safety net.',
    whyInteresting: 'It reframes TypeScript as a workflow advantage, not just a syntax change.',
    topic: 'TypeScript Crash Course',
    channel: 'Traversy Media',
    keyword: 'typescript',
  },
  {
    question: 'Why do product teams confuse requests with real problems?',
    answer: 'Requests describe what users think they want, while problems reveal the situation that needs a better outcome.',
    hook: 'A feature request can hide the real customer pain.',
    whyInteresting: 'It gives teams a sharper way to decide what should be built next.',
    topic: 'Customer Discovery That Works',
    channel: 'Product Thinking',
    keyword: 'product',
  },
  {
    question: 'When should React state move out of a component?',
    answer: 'Move state only when multiple parts of the app need the same durable source of truth.',
    hook: 'Global state is not a storage closet for every UI detail.',
    whyInteresting: 'It challenges the habit of overusing global stores too early.',
    topic: 'React State Boundaries',
    channel: 'Frontend Patterns',
    keyword: 'react',
  },
  {
    question: 'How can a NAS become more useful than another cloud subscription?',
    answer: 'A NAS gives local ownership, predictable access, and flexible backups when the data volume grows.',
    hook: 'Your files may need a home, not another monthly bill.',
    whyInteresting: 'It connects storage decisions to long-term control and workflow reliability.',
    topic: 'Cloud Storage vs NAS in 2026',
    channel: 'Youtive Demo',
    keyword: 'storage',
  },
];

export const engagementQuestionsMock: EngagementQuestionItem[] = Array.from({ length: 20 }, (_, index) => {
  const source = sources[index % sources.length];
  const videoIndex = (index % 8) + 1;

  return {
    question: source.question,
    answer: source.answer,
    hook: source.hook,
    whyInteresting: source.whyInteresting,
    analysisId: `analysis-${index + 1}`,
    video: {
      id: `video-${videoIndex}`,
      youtubeVideoId: `demo-insight-${videoIndex}`,
      youtubeUrl: `https://www.youtube.com/watch?v=demo-insight-${videoIndex}`,
      title: `${source.topic} #${Math.floor(index / sources.length) + 1}`,
      thumbnail: null,
      channelId: `UC_${source.keyword}`,
      channelLogo: null,
      channelName: source.channel,
    },
  };
});
