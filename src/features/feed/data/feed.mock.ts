import type { FeedItem } from '../../../shared/types';

const TOPICS = [
  'English',
  'Product',
  'React',
  'Startup',
  'Design',
  'AI',
  'Marketing',
  'Career',
  'Finance',
  'Learning',
] as const;

const CHANNELS = [
  { name: 'English Fluency Hub', handle: '@englishfluencyhub' },
  { name: 'Product Wisdom', handle: '@productwisdom' },
  { name: 'Build with React', handle: '@buildwithreact' },
  { name: 'Founder Notes', handle: '@foundernotes' },
  { name: 'Design Brief', handle: '@designbrief' },
  { name: 'AI Simplified', handle: '@aisimplified' },
  { name: 'Growth Lab', handle: '@growthlab' },
  { name: 'Career Upgrade', handle: '@careerupgrade' },
  { name: 'Money Basics', handle: '@moneybasics' },
  { name: 'Learn Faster', handle: '@learnfaster' },
] as const;

const TITLE_PARTS = [
  'What you can learn from',
  'A practical breakdown of',
  'The fastest way to understand',
  'Key ideas from',
  'A beginner-friendly summary of',
] as const;

const SUBJECTS = [
  'speaking English every day',
  'customer discovery interviews',
  'React state management',
  'startup traction strategies',
  'UI layout decisions',
  'AI tools for work',
  'content marketing systems',
  'career growth habits',
  'personal finance basics',
  'learning faster with systems',
] as const;

const EXCERPTS = [
  'A concise summary focused on practical takeaways, examples, and what to apply next.',
  'This summary highlights the core idea, important lessons, and the most useful next actions.',
  'Perfect for skimming before you decide whether the full video is worth your time.',
  'A community-made recap that helps you understand the value of the video in minutes.',
  'Short, structured, and useful for people who want the signal without the fluff.',
] as const;

const DURATIONS = [
  '08:42',
  '11:15',
  '14:28',
  '18:24',
  '22:35',
  '26:10',
  '31:48',
] as const;

const TAGS = [
  ['beginner', 'practical', 'summary'],
  ['career', 'skills', 'learning'],
  ['frontend', 'react', 'engineering'],
  ['product', 'research', 'pm'],
  ['design', 'ux', 'workflow'],
  ['ai', 'tools', 'productivity'],
  ['marketing', 'growth', 'strategy'],
  ['finance', 'habits', 'thinking'],
] as const;

export const feedMock: FeedItem[] = Array.from({ length: 50 }, (_, index) => {
  const topicIndex = index % TOPICS.length;
  const channel = CHANNELS[index % CHANNELS.length];
  const titlePart = TITLE_PARTS[index % TITLE_PARTS.length];
  const subject = SUBJECTS[index % SUBJECTS.length];
  const excerpt = EXCERPTS[index % EXCERPTS.length];
  const duration = DURATIONS[index % DURATIONS.length];
  const tags = [...TAGS[index % TAGS.length]];

  const id = `feed-${index + 1}`;
  const videoId = `demo-video-${index + 1}`;

  return {
    id,
    title: `${titlePart} ${subject}`,
    channelName: channel.name,
    channelUrl: `https://youtube.com/${channel.handle}`,
    thumbnailUrl: `https://picsum.photos/seed/${id}/1280/720`,
    videoUrl: `https://youtube.com/watch?v=${videoId}`,
    duration,
    topic: TOPICS[topicIndex],
    summaryCount: 12 + (index % 17),
    likes: 120 + index * 13,
    savedCount: 40 + index * 7,
    publishedAt: `2026-06-${String((index % 28) + 1).padStart(2, '0')}`,
    excerpt,
    tags,
  };
});
