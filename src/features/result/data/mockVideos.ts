import type { VideoAnalysis } from '../../analysis/types';

function buildSummary(overview: string, takeaways: string[], importantPoints: VideoAnalysis['importantPoints'] = []) {
  return {
    summary: overview,
    oneLineSummary: overview,
    detailedExplanation: [],
    importantDetails: [],
    examples: [],
    keyInsights: (importantPoints ?? []).map((item) => ({
      insight: item.point,
      whyImportant: item.whyItMatters,
      mindsetChange: '',
    })),
    mentalModel: null,
    practicalTakeaways: takeaways,
    researchRoadmap: { tools: [], trends: [], concepts: [], deepQuestions: [] },
    limitations: [],
    worthIt: null,
  };
}

export const mockVideos: VideoAnalysis[] = [
  {
    id: 'english-speaking',
    analysisId: 'analysis_en_english-speaking',
    language: 'en',
    videoId: 'dQw4w9WgXcQ',
    title: 'English Speaking Practice for Beginners',
    channelName: 'English Fluency Hub',
    channelUrl: 'https://youtube.com/@englishfluencyhub',
    channelId: 'UCenglishfluencyhub',
    channelLogo: 'https://yt3.googleusercontent.com/english-fluency-hub',
    duration: '18:24',
    thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '2024-01-15T10:00:00.000Z',
    keywords: ['english', 'speaking', 'beginner', 'practice', 'language'],
    outcomes: [
      'Introduce your daily routine in simple English',
      'Use 10 common verbs for everyday life',
      'Answer basic questions about your day',
      'Speak with less hesitation using ready-made phrases',
    ],
    overview: 'Speaking English fluently starts with mastering simple daily conversations, not complex grammar. The speaker focuses on repeatable sentence patterns that make everyday speaking easier.',
    timeline: [
      {
        heading: 'Build from daily routines',
        whatIsCovered: 'The speaker introduces reusable sentence patterns for talking about ordinary activities.',
        importantDetails: [
          'Use the present simple for repeated habits.',
          'Practice short patterns before trying advanced grammar.',
        ],
      },
      {
        heading: 'Reduce hesitation while speaking',
        whatIsCovered: 'The video explains how fillers and repetition can make speaking feel more natural.',
        importantDetails: [
          'Use fillers like "Well..." and "Let me think..." to buy time.',
          'Repeat phrases aloud to build muscle memory.',
        ],
      },
    ],
    importantPoints: [
      {
        point: 'Confidence grows faster when learners start with familiar daily topics.',
        whyItMatters: 'It lowers cognitive load and gives the learner phrases they can use immediately.',
      },
      {
        point: 'Repetition matters more than perfect grammar at this stage.',
        whyItMatters: 'Automatic sentence recall is what helps a beginner speak without freezing.',
      },
    ],
    takeaways: [
      'Practice each phrase out loud three times.',
      'Focus on five useful patterns each week.',
      'Record short answers to common daily questions.',
    ],
    careerInference: {
      likelyRoles: ['Language learner', 'Customer support trainee'],
      confidence: 'medium',
      reasoning: 'The content centers on structured spoken responses and everyday conversational fluency.',
      recommendedTopics: ['Conversation drills', 'Listening practice'],
      personalizedAdvice: ['Build a small library of reusable daily phrases.', 'Practice short spoken answers before longer free-form speaking.'],
    },
    engagementQuestions: [
      {
        question: 'Why do so many beginners freeze even when they know the vocabulary?',
        answer: 'Because they have not practiced whole sentence patterns often enough to recall them quickly.',
        hook: 'Knowing words is not the same as being ready to speak.',
        whyInteresting: 'It reframes the problem from memory to retrieval and practice design.',
      },
    ],
    originalContext: {
      keywords: ['english', 'speaking', 'routine'],
      people: [],
      topics: ['language learning', 'beginner conversation'],
    },
    summary: buildSummary(
      'Speaking English fluently starts with mastering simple daily conversations, not complex grammar. The speaker focuses on repeatable sentence patterns that make everyday speaking easier.',
      [
        'Practice each phrase out loud three times.',
        'Focus on five useful patterns each week.',
        'Record short answers to common daily questions.',
      ],
      [
        {
          point: 'Confidence grows faster when learners start with familiar daily topics.',
          whyItMatters: 'It lowers cognitive load and gives the learner phrases they can use immediately.',
        },
      ],
    ),
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
    analysisId: 'analysis_en_product-discovery',
    language: 'en',
    videoId: 'gHkP4m7v9Q0',
    title: 'How to Find Real Customer Problems',
    channelName: 'Product Wisdom',
    channelUrl: 'https://youtube.com/@productwisdom',
    channelId: 'UCproductwisdom',
    channelLogo: 'https://yt3.googleusercontent.com/product-wisdom',
    duration: '24:10',
    thumbnailUrl: 'https://i.ytimg.com/vi/gHkP4m7v9Q0/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=gHkP4m7v9Q0',
    youtubeUrl: 'https://youtube.com/watch?v=gHkP4m7v9Q0',
    publishedAt: '2024-03-20T08:30:00.000Z',
    keywords: ['product', 'customer', 'discovery', 'problem', 'pm'],
    outcomes: [
      'Separate customer problems from feature ideas',
      'Ask better discovery questions',
      'Avoid building features nobody needs',
      'Turn user pain into product direction',
    ],
    overview: 'The video argues that strong product discovery starts by understanding the underlying customer problem, not by reacting directly to feature requests.',
    timeline: [
      {
        heading: 'Separate requests from needs',
        whatIsCovered: 'The speaker explains why a feature request is evidence, not the problem itself.',
        importantDetails: [
          'Keep asking why until you reach the real obstacle or pain.',
          'Use the customer’s last real experience, not hypotheticals.',
        ],
      },
      {
        heading: 'Prioritize what matters',
        whatIsCovered: 'The video closes with a practical framework for ranking discovered problems.',
        importantDetails: [
          'Use frequency, impact, and reach as the main prioritization filters.',
        ],
      },
    ],
    importantPoints: [
      {
        point: 'Workarounds are one of the strongest signals of unmet demand.',
        whyItMatters: 'Users invest effort in workarounds only when the pain is meaningful.',
      },
      {
        point: 'Hypothetical interview answers are weaker than recent real stories.',
        whyItMatters: 'Real behavior is more reliable than stated intent.',
      },
    ],
    takeaways: [
      'Translate feature requests into the underlying problem statement.',
      'Ask about the last time the user experienced the issue.',
      'Rank patterns by frequency, impact, and customer reach.',
    ],
    careerInference: {
      likelyRoles: ['Product manager', 'UX researcher'],
      confidence: 'high',
      reasoning: 'The examples and framing focus on discovery interviews, unmet needs, and prioritization frameworks.',
      recommendedTopics: ['Interview synthesis', 'Problem framing', 'Prioritization'],
      personalizedAdvice: ['Collect verbatim quotes during interviews.', 'Review workarounds before deciding on solution scope.'],
    },
    engagementQuestions: [
      {
        question: 'Why do product teams mistake feature requests for product strategy?',
        answer: 'Because requests arrive with a suggested solution attached, which can hide the underlying user pain.',
        hook: 'The loudest request is not always the real problem.',
        whyInteresting: 'It challenges a common bias in roadmap planning.',
      },
    ],
    originalContext: {
      keywords: ['product discovery', 'customer problem'],
      people: [],
      topics: ['product management', 'user research'],
    },
    summary: buildSummary(
      'The video argues that strong product discovery starts by understanding the underlying customer problem, not by reacting directly to feature requests.',
      [
        'Translate feature requests into the underlying problem statement.',
        'Ask about the last time the user experienced the issue.',
        'Rank patterns by frequency, impact, and customer reach.',
      ],
      [
        {
          point: 'Workarounds are one of the strongest signals of unmet demand.',
          whyItMatters: 'Users invest effort in workarounds only when the pain is meaningful.',
        },
      ],
    ),
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
    analysisId: 'analysis_en_react-state',
    language: 'en',
    videoId: 'rS4Tn8m2Jk1',
    title: 'React State Management Explained',
    channelName: 'Build with React',
    channelUrl: 'https://youtube.com/@buildwithreact',
    channelId: 'UCbuildwithreact',
    channelLogo: 'https://yt3.googleusercontent.com/build-with-react',
    duration: '22:35',
    thumbnailUrl: 'https://i.ytimg.com/vi/rS4Tn8m2Jk1/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=rS4Tn8m2Jk1',
    youtubeUrl: 'https://youtube.com/watch?v=rS4Tn8m2Jk1',
    publishedAt: '2024-06-10T14:00:00.000Z',
    keywords: ['react', 'state', 'management', 'frontend', 'javascript'],
    outcomes: [
      'Explain when local state is enough',
      'Understand when to use global state',
      'Avoid unnecessary state complexity',
      'Choose a simple state strategy for small apps',
    ],
    overview: 'The speaker presents state management as a ladder: start local, move upward only when coordination demands it, and avoid adding global tools too early.',
    timeline: [
      {
        heading: 'Default to local state',
        whatIsCovered: 'The video argues that `useState` is the baseline until multiple components genuinely need shared control.',
        importantDetails: [
          'Props drilling across a few layers is acceptable.',
          'Move state upward only when the coordination problem is real.',
        ],
      },
      {
        heading: 'Separate UI state from server state',
        whatIsCovered: 'The speaker explains that API data has its own loading, caching, and synchronization concerns.',
        importantDetails: [
          'Treat server state differently from component-local state.',
          'Global libraries are often introduced too early.',
        ],
      },
    ],
    importantPoints: [
      {
        point: 'The simplest working state solution is usually the right first choice.',
        whyItMatters: 'Premature complexity makes the app harder to maintain without solving a real problem yet.',
      },
      {
        point: 'Server state is a different category from UI state.',
        whyItMatters: 'It changes how you think about caching, synchronization, and loading behavior.',
      },
    ],
    takeaways: [
      'Start with local state and refactor when pain is real.',
      'Use context for simple app-wide concerns like theme or auth.',
      'Keep API data concerns separate from UI interaction state.',
    ],
    careerInference: {
      likelyRoles: ['Frontend engineer', 'React developer'],
      confidence: 'high',
      reasoning: 'The content is explicitly about React architecture choices and state-management trade-offs.',
      recommendedTopics: ['Server state', 'Context patterns', 'Component architecture'],
      personalizedAdvice: ['Audit whether each state value truly needs to be global.', 'Document when shared state was introduced and why.'],
    },
    engagementQuestions: [
      {
        question: 'Why do teams reach for global state before they actually need it?',
        answer: 'Because adding a state library can feel like a sign of maturity even when the real coordination pain has not appeared yet.',
        hook: 'Complex tools can make simple apps harder, not better.',
        whyInteresting: 'It challenges a very common architecture reflex in frontend teams.',
      },
    ],
    originalContext: {
      keywords: ['react', 'useState', 'context'],
      people: [],
      topics: ['frontend architecture', 'state management'],
    },
    summary: buildSummary(
      'The speaker presents state management as a ladder: start local, move upward only when coordination demands it, and avoid adding global tools too early.',
      [
        'Start with local state and refactor when pain is real.',
        'Use context for simple app-wide concerns like theme or auth.',
        'Keep API data concerns separate from UI interaction state.',
      ],
      [
        {
          point: 'The simplest working state solution is usually the right first choice.',
          whyItMatters: 'Premature complexity makes the app harder to maintain without solving a real problem yet.',
        },
      ],
    ),
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
  const match = mockVideos.find((video) =>
    video.keywords.some((keyword) => lower.includes(keyword)),
  );

  return match ?? mockVideos[0];
}
