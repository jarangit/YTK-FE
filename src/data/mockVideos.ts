import type { MockVideo } from '../types';

export const mockVideos: MockVideo[] = [
  {
    id: 'english-speaking',
    videoId: 'dQw4w9WgXcQ',
    title: 'English Speaking Practice for Beginners',
    channelName: 'English Fluency Hub',
    channelUrl: 'https://youtube.com/@englishfluencyhub',
    duration: '18:24',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    keywords: ['english', 'speaking', 'beginner', 'practice', 'language'],
    outcomes: [
      'Introduce your daily routine in simple English',
      'Use 10 common verbs for everyday life',
      'Answer basic questions about your day',
      'Speak with less hesitation using ready-made phrases',
    ],
    summary: {
      bigIdea:
        'Speaking English fluently starts with mastering simple daily conversations — not complex grammar. This video teaches you how to talk about your everyday life using natural, repeatable patterns.',
      keyPoints: [
        'Start every conversation with a greeting and a simple status update about your day',
        'Use the present simple tense to describe routines: "I wake up at 7am"',
        'Common daily verbs: wake up, have breakfast, go to work, check emails, have lunch, finish work, go home, have dinner, watch TV, go to bed',
        'Answer "How was your weekend?" with: "It was [good/great/okay]. I [activity] on [day]."',
        'Use fillers like "Well...", "Let me think..." to buy time while speaking',
      ],
      usefulExamples: [
        '"I wake up at 6am, have breakfast, and go to work by bus."',
        '"How was your day?" — "It was busy but good. I had a meeting in the morning."',
        '"What do you do in the evening?" — "I usually watch Netflix or read a book."',
        '"Let me think... On Saturday, I went to the park with my friends."',
      ],
      thingsToRemember: [
        'You don\'t need perfect grammar to communicate effectively',
        'Practice each phrase out loud 3 times to build muscle memory',
        'Record yourself answering these questions to track improvement',
        'Focus on 5 phrases per week rather than trying to learn everything at once',
      ],
    },
  },
  {
    id: 'product-discovery',
    videoId: 'dQw4w9WgXcQ',
    title: 'How to Find Real Customer Problems',
    channelName: 'Product Wisdom',
    channelUrl: 'https://youtube.com/@productwisdom',
    duration: '24:10',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    keywords: ['product', 'customer', 'discovery', 'problem', 'pm'],
    outcomes: [
      'Separate customer problems from feature ideas',
      'Ask better discovery questions',
      'Avoid building features nobody needs',
      'Turn user pain into product direction',
    ],
    summary: {
      bigIdea:
        'Most product teams fail because they start with solutions instead of problems. This video shows you how to systematically discover what customers actually need — before writing a single line of code.',
      keyPoints: [
        'A feature idea is not a problem. Keep asking "why" until you reach the underlying need',
        'Use the "5 Whys" technique to drill from symptoms to root causes',
        'Interview customers about their last experience, not hypothetical scenarios',
        'Look for workarounds — they reveal unmet needs more clearly than surveys',
        'Prioritize problems by frequency, impact, and how many users experience them',
      ],
      usefulExamples: [
        'Instead of "Would you use a dark mode?" ask "When do you use our app in low light?"',
        'A user requesting "better search" might actually mean "I can\'t find my past orders easily"',
        'If users export data to Excel to analyze it, that\'s a signal for better reporting',
        '"I wish this integrated with Slack" → "I\'m missing notifications when things change"',
      ],
      thingsToRemember: [
        'Validate the problem exists before designing the solution',
        'Talk to 5-8 users per segment before synthesizing patterns',
        'Document verbatim quotes — they reveal how users think, not just what they want',
        'A problem well-stated is a problem half-solved',
      ],
    },
  },
  {
    id: 'react-state',
    videoId: 'dQw4w9WgXcQ',
    title: 'React State Management Explained',
    channelName: 'Build with React',
    channelUrl: 'https://youtube.com/@buildwithreact',
    duration: '22:35',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    keywords: ['react', 'state', 'management', 'frontend', 'javascript'],
    outcomes: [
      'Explain when local state is enough',
      'Understand when to use global state',
      'Avoid unnecessary state complexity',
      'Choose a simple state strategy for small apps',
    ],
    summary: {
      bigIdea:
        'You don\'t need Redux or Zustand for most apps. This video teaches you a mental model for choosing the simplest possible state solution at every level of your React application.',
      keyPoints: [
        'Local state (useState) is always the default — only lift state when truly needed',
        'Props drilling is fine for 2-3 levels; useContext for deeper sharing',
        'Global state libraries solve problems you might not have yet — don\'t pre-optimize',
        'Server state (from APIs) should stay separate from UI state',
        'useReducer is for state logic that has multiple sub-values or depends on previous state',
      ],
      usefulExamples: [
        'A form input → useState (local)',
        'Theme or auth → useContext (app-wide but simple)',
        'Shopping cart across pages → useReducer + Context (multiple actions)',
        'Data from an API → custom hook with fetch/loading states (server state)',
      ],
      thingsToRemember: [
        'Start with the simplest solution and refactor when you feel the pain',
        'If you\'re passing props 5+ levels deep, consider context or composition',
        'Not every piece of state needs to be global — keep things close to where they\'re used',
        'Ask: "Would this break if I unmounted this component?" — if no, it can be local',
      ],
    },
  },
];

export function findMockVideo(url: string): MockVideo | undefined {
  const lower = url.toLowerCase();
  const match = mockVideos.find((v) =>
    v.keywords.some((kw) => lower.includes(kw)),
  );
  return match ?? mockVideos[0];
}
