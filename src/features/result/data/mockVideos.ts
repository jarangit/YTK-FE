import { normalizeLegacySummary, type VideoAnalysis } from '../../analysis/types';

export const mockVideos: VideoAnalysis[] = [
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
    summary: normalizeLegacySummary({
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
    }),
    transcript: [
      { startSeconds: 0, endSeconds: 18, text: 'Welcome back. Today we are going to practice simple English for talking about your daily routine.' },
      { startSeconds: 18, endSeconds: 42, text: 'You do not need difficult grammar. You need a few useful sentence patterns that you can repeat every day.' },
      { startSeconds: 42, endSeconds: 71, text: 'Let us begin with the morning. You can say: I wake up at seven, I have breakfast, and I go to work.' },
      { startSeconds: 71, endSeconds: 104, text: 'Notice that we use the present simple because these actions are part of a regular routine.' },
      { startSeconds: 104, endSeconds: 139, text: 'When someone asks how your day was, start with a short answer such as it was busy but good.' },
      { startSeconds: 139, endSeconds: 176, text: 'Then add one detail. For example, I had a meeting in the morning and finished work at six.' },
      { startSeconds: 176, endSeconds: 214, text: 'If you need more time to think, use a natural filler like well or let me think.' },
      { startSeconds: 214, endSeconds: 252, text: 'Practice each sentence out loud three times. Repetition will help the words feel natural when you speak.' },
    ],
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
    summary: normalizeLegacySummary({
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
    }),
    transcript: [
      { startSeconds: 0, endSeconds: 26, text: 'Product discovery starts with a customer problem, not with a feature that your team wants to build.' },
      { startSeconds: 26, endSeconds: 58, text: 'A feature request is useful evidence, but it is not yet a clear description of the underlying need.' },
      { startSeconds: 58, endSeconds: 94, text: 'Ask what happened the last time the customer experienced the problem. Real stories are more reliable than hypothetical answers.' },
      { startSeconds: 94, endSeconds: 131, text: 'Look for workarounds. When people build spreadsheets or manual processes, they are showing you where the product is missing value.' },
      { startSeconds: 131, endSeconds: 169, text: 'Use the five whys to move from the visible symptom toward the root cause.' },
      { startSeconds: 169, endSeconds: 207, text: 'Finally, compare problems by frequency, impact, and the number of customers who experience them.' },
    ],
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
    summary: normalizeLegacySummary({
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
    }),
    transcript: [
      { startSeconds: 0, endSeconds: 24, text: 'The simplest rule for React state is to keep it close to the component that uses it.' },
      { startSeconds: 24, endSeconds: 55, text: 'Start with useState. Move state upward only when two or more components need the same value.' },
      { startSeconds: 55, endSeconds: 91, text: 'Passing props through a few levels is not automatically a problem. Composition can often keep the code clear.' },
      { startSeconds: 91, endSeconds: 128, text: 'Context is useful for values such as authentication or theme that many parts of the app need.' },
      { startSeconds: 128, endSeconds: 166, text: 'Server data should be treated differently from local UI state because it has caching, loading, and synchronization concerns.' },
      { startSeconds: 166, endSeconds: 205, text: 'Choose a global state library only after the application has a real coordination problem that local state cannot solve cleanly.' },
      { startSeconds: 3661, endSeconds: 3694, text: 'For long recordings, timestamps continue to include the hour so copied transcripts remain easy to navigate.' },
    ],
  },
];

export function findVideoAnalysis(url: string): VideoAnalysis | undefined {
  const lower = url.toLowerCase();
  const match = mockVideos.find((v) =>
    v.keywords.some((kw) => lower.includes(kw)),
  );
  return match ?? mockVideos[0];
}
