export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  channelName: string;
  date: string;
  duration: string;
  imageUrl: string;
  backgroundColor: string;
  textColor: string;
}

export interface ShowItem {
  id: string;
  title: string;
  category: string;
  meta: string;
  imageUrl: string;
}

export const upNextEpisodes: PodcastEpisode[] = [
  {
    id: 'ep-1',
    title: 'Easy English: Daily Phrases for Beginners',
    description: 'Simple and useful English phrases for everyday conversations.',
    channelName: 'Easy Natural English',
    date: 'Jun 10',
    duration: '15 min',
    imageUrl: '',
    backgroundColor: '#f5a623',
    textColor: '#1d1d1f',
  },
  {
    id: 'ep-2',
    title: 'ESL Podcast 1105: Workplace Communication',
    description: 'Learn key phrases for professional email and meeting etiquette.',
    channelName: 'Speak English with ESLPod.com',
    date: 'Jun 9',
    duration: '22 min',
    imageUrl: '',
    backgroundColor: '#4a90d9',
    textColor: '#ffffff',
  },
  {
    id: 'ep-3',
    title: '6 Minute English: The Future of AI',
    description: 'Join Neil and Sam as they discuss artificial intelligence.',
    channelName: 'BBC Learning English',
    date: 'Jun 8',
    duration: '6 min',
    imageUrl: '',
    backgroundColor: '#7b2ff7',
    textColor: '#ffffff',
  },
  {
    id: 'ep-4',
    title: 'How to Stay Motivated While Learning',
    description: 'Practical tips to maintain your language learning momentum.',
    channelName: 'TED Talks Daily',
    date: 'Jun 7',
    duration: '18 min',
    imageUrl: '',
    backgroundColor: '#e84d4d',
    textColor: '#ffffff',
  },
  {
    id: 'ep-5',
    title: 'The Sleepy Sloth and the Moon',
    description: 'A calming bedtime story for young listeners.',
    channelName: 'Sleep Tight Stories',
    date: 'Jun 6',
    duration: '25 min',
    imageUrl: '',
    backgroundColor: '#6bb5a0',
    textColor: '#ffffff',
  },
  {
    id: 'ep-6',
    title: 'Grammar Tip: Present Perfect vs Past Simple',
    description: 'Clear explanation with real-life examples to master this tricky topic.',
    channelName: 'Easy Natural English',
    date: 'Jun 5',
    duration: '12 min',
    imageUrl: '',
    backgroundColor: '#f5a623',
    textColor: '#1d1d1f',
  },
  {
    id: 'ep-7',
    title: 'English for Travel: At the Airport',
    description: 'Essential vocabulary and phrases for stress-free airport travel.',
    channelName: 'Speak English with ESLPod.com',
    date: 'Jun 4',
    duration: '20 min',
    imageUrl: '',
    backgroundColor: '#4a90d9',
    textColor: '#ffffff',
  },
];

export const shows: ShowItem[] = [
  {
    id: 'show-1',
    title: 'American English Podcast',
    category: 'Education',
    meta: 'Updated daily',
    imageUrl: '',
  },
  {
    id: 'show-2',
    title: 'Speak English',
    category: 'Language Learning',
    meta: 'Updated weekly',
    imageUrl: '',
  },
  {
    id: 'show-3',
    title: 'English Conversations',
    category: 'Education',
    meta: 'Updated every 2 days',
    imageUrl: '',
  },
  {
    id: 'show-4',
    title: 'Thinking in English',
    category: 'Language Learning',
    meta: 'Updated Mon-Fri',
    imageUrl: '',
  },
  {
    id: 'show-5',
    title: 'Easy Stories in English',
    category: 'Education',
    meta: 'Updated weekly',
    imageUrl: '',
  },
  {
    id: 'show-6',
    title: 'Sleep Tight Stories',
    category: 'Kids & Family',
    meta: 'Updated daily',
    imageUrl: '',
  },
];

const gradients: Record<string, string> = {
  'Easy Natural English': 'linear-gradient(135deg, #f5a623 0%, #f7c948 100%)',
  'Speak English with ESLPod.com': 'linear-gradient(135deg, #4a90d9 0%, #7bb3f0 100%)',
  'BBC Learning English': 'linear-gradient(135deg, #7b2ff7 0%, #a974f8 100%)',
  'TED Talks Daily': 'linear-gradient(135deg, #e84d4d 0%, #f07575 100%)',
  'Sleep Tight Stories': 'linear-gradient(135deg, #6bb5a0 0%, #8ed4bf 100%)',
};

export function getGradientForChannel(channelName: string): string {
  return gradients[channelName] || 'linear-gradient(135deg, #b8b8b8 0%, #d8d8d8 100%)';
}

const showGradients: Record<string, string> = {
  'American English Podcast': 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
  'Speak English': 'linear-gradient(135deg, #4ecdc4 0%, #6ee7de 100%)',
  'English Conversations': 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
  'Thinking in English': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  'Easy Stories in English': 'linear-gradient(135deg, #34c759 0%, #5ee67e 100%)',
  'Sleep Tight Stories': 'linear-gradient(135deg, #6bb5a0 0%, #8ed4bf 100%)',
};

export function getShowGradient(title: string): string {
  return showGradients[title] || 'linear-gradient(135deg, #b8b8b8 0%, #d8d8d8 100%)';
}
