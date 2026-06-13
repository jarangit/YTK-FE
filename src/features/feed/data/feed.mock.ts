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

const OUTCOMES: Record<number, string[]> = {
  0: [
    'Introduce your daily routine in simple English',
    'Use 10 common verbs for everyday life',
    'Answer basic questions about your day',
    'Speak with less hesitation using ready-made phrases',
  ],
  1: [
    'Separate customer problems from feature ideas',
    'Ask better discovery questions',
    'Avoid building features nobody needs',
    'Turn user pain into product direction',
  ],
  2: [
    'Explain when local state is enough',
    'Understand when to use global state',
    'Avoid unnecessary state complexity',
    'Choose a simple state strategy for small apps',
  ],
  3: [
    'Identify traction channels that fit your stage',
    'Set meaningful growth metrics',
    'Avoid common early-stage traction mistakes',
    'Build a repeatable growth loop',
  ],
  4: [
    'Make layout decisions based on user goals',
    'Use whitespace as a design tool',
    'Create visual hierarchy without clutter',
    'Apply contrast to guide attention',
  ],
  5: [
    'Pick the right AI tool for a specific task',
    'Integrate AI into daily workflows',
    'Evaluate AI output critically',
    'Avoid common pitfalls with AI-generated content',
  ],
  6: [
    'Build a content system that scales',
    'Repurpose one piece of content across channels',
    'Measure what matters in content marketing',
    'Create a content calendar in 30 minutes',
  ],
  7: [
    'Identify your next career move with clarity',
    'Build skills that matter for your target role',
    'Network without feeling fake',
    'Create a growth plan you will actually follow',
  ],
  8: [
    'Build a simple monthly budget that works',
    'Understand the difference between assets and liabilities',
    'Start an emergency fund from scratch',
    'Avoid common personal finance traps',
  ],
  9: [
    'Design a learning system that fits your schedule',
    'Use active recall to retain more',
    'Break complex topics into learnable chunks',
    'Track progress without overcomplicating it',
  ],
};

const SUMMARIES: Record<number, FeedItem['summary']> = {
  0: {
    bigIdea: 'Speaking English fluently starts with mastering simple daily conversations — not complex grammar. This video teaches you how to talk about your everyday life using natural, repeatable patterns.',
    keyPoints: [
      'Start with greetings and a simple status update about your day',
      'Use present simple tense for routines: "I wake up at 7am"',
      'Master 10 common daily verbs: wake up, have breakfast, go to work',
      'Answer "How was your weekend?" with simple structured responses',
      'Use fillers like "Well..." to buy time while speaking',
    ],
    usefulExamples: [
      '"I wake up at 6am, have breakfast, and go to work by bus."',
      '"How was your day?" — "It was busy but good."',
      '"What do you do in the evening?" — "I usually watch Netflix."',
    ],
    thingsToRemember: [
      'You don\'t need perfect grammar to communicate effectively',
      'Practice each phrase out loud 3 times to build muscle memory',
      'Focus on 5 phrases per week, not everything at once',
    ],
  },
  1: {
    bigIdea: 'Most product teams fail because they start with solutions instead of problems. This video shows you how to systematically discover what customers actually need.',
    keyPoints: [
      'A feature idea is not a problem — keep asking "why"',
      'Use the "5 Whys" technique to reach root causes',
      'Interview about past experiences, not hypotheticals',
      'Look for workarounds — they reveal unmet needs',
    ],
    usefulExamples: [
      'Instead of "Would you use dark mode?" ask "When do you use our app in low light?"',
      'A user requesting "better search" might need "find past orders easily"',
    ],
    thingsToRemember: [
      'Validate the problem before designing the solution',
      'Talk to 5-8 users before synthesizing patterns',
      'A problem well-stated is a problem half-solved',
    ],
  },
  2: {
    bigIdea: 'You don\'t need Redux or Zustand for most apps. This video teaches you a mental model for choosing the simplest state solution at every level.',
    keyPoints: [
      'Local state (useState) is always the default',
      'Props drilling is fine for 2-3 levels',
      'Global state libraries solve problems you might not have yet',
      'Server state should stay separate from UI state',
    ],
    usefulExamples: [
      'A form input → useState',
      'Theme or auth → useContext',
      'Shopping cart → useReducer + Context',
      'API data → custom hook with fetch states',
    ],
    thingsToRemember: [
      'Start simple and refactor when you feel the pain',
      'Not every piece of state needs to be global',
      'Ask: "Would this break if I unmounted this component?"',
    ],
  },
  3: {
    bigIdea: 'Startups die from lack of traction, not lack of product. This video gives you a framework to find the right growth channel for your stage.',
    keyPoints: [
      'Not all traction channels work for every business stage',
      'Focus on one channel at a time until it saturates',
      'Traction is about learning speed — not just revenue',
      'Measure leading indicators, not just lagging ones',
    ],
    usefulExamples: [
      'Pre-product: content marketing + community building',
      'Early traction: targeted outreach + sales demos',
      'Scaling: paid ads + referral programs',
    ],
    thingsToRemember: [
      'Traction takes longer than you expect — be patient',
      'Pivot the channel, not the product, first',
      'Talk to users who almost signed up but didn\'t',
    ],
  },
  4: {
    bigIdea: 'Good design is invisible. This video helps you understand how visual hierarchy, spacing, and contrast work together to create interfaces that feel effortless.',
    keyPoints: [
      'Visual hierarchy guides the eye before the user reads anything',
      'Whitespace is not wasted space — it is a design tool',
      'Contrast creates focus; uniformity creates calm',
      'Every element should earn its place on the screen',
    ],
    usefulExamples: [
      'Big headlines + small body text = clear hierarchy',
      'More space around an action = more importance',
      'Remove one element and see if the page still works',
    ],
    thingsToRemember: [
      'Design for scanning, not reading',
      'Limit to one primary action per screen',
      'If everything is bold, nothing is bold',
    ],
  },
  5: {
    bigIdea: 'AI tools are only as useful as your ability to integrate them into real workflows. This video cuts through the hype and shows practical applications.',
    keyPoints: [
      'Match the tool to the task type: text, image, analysis',
      'AI excels at drafting, summarizing, and brainstorming',
      'Always verify AI output — especially facts and numbers',
      'Build prompts that include context, format, and constraints',
    ],
    usefulExamples: [
      'Use AI to draft emails, then personalize before sending',
      'Summarize long articles into 3 bullet points',
      'Generate multiple headlines and pick the best one',
    ],
    thingsToRemember: [
      'AI is a collaborator, not a replacement',
      'The quality of output depends on the quality of input',
      'Develop a personal prompt library',
    ],
  },
  6: {
    bigIdea: 'Content marketing is a system, not a campaign. This video shows you how to build a repeatable content engine that generates leads over time.',
    keyPoints: [
      'One piece of content can be repurposed into 10 formats',
      'Consistency beats perfection every time',
      'Distribution is as important as creation',
      'Measure by engagement and conversion, not vanity metrics',
    ],
    usefulExamples: [
      'Turn a blog post into: tweet thread, LinkedIn carousel, newsletter, podcast script',
      'Create templates for common content types',
      'Use a simple spreadsheet as your content calendar',
    ],
    thingsToRemember: [
      'Write for one person, not a crowd',
      'Repurpose before creating new content',
      'Focus on the top of the funnel first',
    ],
  },
  7: {
    bigIdea: 'Career growth is not about working harder — it is about being intentional. This video helps you design your career like you would design a product.',
    keyPoints: [
      'Define what success looks like for you, not your manager',
      'Skills compound over time — invest in the right ones',
      'Your network is your net worth, but quality beats quantity',
      'Feedback is data — collect it, filter it, act on it',
    ],
    usefulExamples: [
      'Use an "impact log" to track achievements for reviews',
      'Schedule 30-min coffee chats with people one level ahead',
      'Learn one new skill per quarter, not ten per month',
    ],
    thingsToRemember: [
      'Career growth is non-linear — plateaus are normal',
      'Say yes to opportunities that scare you a little',
      'Leave before you are ready to grow faster',
    ],
  },
  8: {
    bigIdea: 'Personal finance is about systems, not math. This video teaches you simple habits that work regardless of your income level.',
    keyPoints: [
      'Budget by category, not by transaction tracking',
      'Pay yourself first: automate savings before spending',
      'An emergency fund of 3-6 months is non-negotiable',
      'Invest early and often — time beats timing',
    ],
    usefulExamples: [
      '50/30/20 rule: needs, wants, savings',
      'Set up automatic transfers on payday',
      'Use separate accounts for different goals',
    ],
    thingsToRemember: [
      'Small habits compound more than big wins',
      'Avoid lifestyle inflation when income grows',
      'The best time to start was yesterday — the next best is today',
    ],
  },
  9: {
    bigIdea: 'Learning is a skill you can improve. This video replaces "I\'m not good at learning" with a practical system that works for any topic.',
    keyPoints: [
      'Active recall beats passive reading by a factor of 3',
      'Spaced repetition is the most efficient way to retain info',
      'Teach someone else to find gaps in your understanding',
      'Chunk complex topics into 20-minute learning sessions',
    ],
    usefulExamples: [
      'After reading, close the book and write what you remember',
      'Use flashcards for facts, concept maps for relationships',
      'Explain a concept to a friend who knows nothing about it',
    ],
    thingsToRemember: [
      'Learning should feel effortful — that is how growth happens',
      'Review within 24 hours, then 7 days, then 30 days',
      'Focus on understanding, not finishing',
    ],
  },
};

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
    outcomes: OUTCOMES[topicIndex],
    summary: SUMMARIES[topicIndex],
  };
});

export function getFeedItemById(id: string) {
  return feedMock.find((item) => item.id === id);
}
