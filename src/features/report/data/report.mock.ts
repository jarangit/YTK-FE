import type { DashboardReport } from '../types';

export const dashboardReportMock: DashboardReport = {
  summary: {
    users: {
      total: 150,
      newToday: 3,
      newThisWeek: 12,
      newThisMonth: 45,
    },
    videos: {
      total: 300,
      byStatus: {
        COMPLETED: 250,
        PROCESSING: 10,
        PENDING: 20,
        FAILED: 20,
      },
      failureRate: 0.0667,
    },
    analyses: {
      total: 350,
      byLanguage: {
        en: 200,
        th: 150,
      },
      failureRate: 0.0571,
    },
    engagement: {
      totalEvents: 2500,
      totalLibrarySaves: 180,
      totalFeedItems: 1200,
      eventsByType: {
        analysis_viewed: 2000,
        video_analyzed: 350,
        keep_clicked: 100,
        remove_clicked: 50,
      },
    },
  },
  trends: generateTrends(),
  topContent: {
    channels: [
      { channelName: 'Fireship', videoCount: 25 },
      { channelName: 'Theo - t3.gg', videoCount: 18 },
      { channelName: 'Web Dev Simplified', videoCount: 15 },
      { channelName: 'Syntax FM', videoCount: 12 },
      { channelName: 'Hacker News', videoCount: 10 },
    ],
    keywords: [
      { keyword: 'typescript', count: 42 },
      { keyword: 'react', count: 35 },
      { keyword: 'nextjs', count: 28 },
      { keyword: 'tailwind', count: 22 },
      { keyword: 'prisma', count: 18 },
    ],
  },
  topViewedVideos: [
    {
      videoId: 'video-1',
      viewCount: 149,
      rank: 1,
      video: {
        id: 'video-1',
        youtubeVideoId: 'JF1sOZFtua4',
        youtubeUrl: 'https://www.youtube.com/watch?v=JF1sOZFtua4',
        title: '10 speaking techniques to become instantly better',
        thumbnail: 'https://i.ytimg.com/vi/JF1sOZFtua4/maxresdefault.jpg',
        channelId: 'channel-1',
        channelLogo: 'https://yt3.ggpht.com/VI05LT9oKeYHoKuvZmnEYSgMt2Dq31AngM1IpcNTB_U7T5QbCdKJbV7z7gGMz8VIqKsHfHT-U1A=s800-c-k-c0x00ffffff-no-rj',
        channelName: 'Dev Sethi Thailand',
        duration: 1025,
      },
      analysis: {
        id: 'analysis-1',
        language: 'th',
        status: 'COMPLETED',
        overview: 'A practical breakdown of speaking and communication techniques.',
        createdAt: '2026-07-06T19:28:21.720Z',
      },
    },
    {
      videoId: 'video-2',
      viewCount: 84,
      rank: 2,
      video: {
        id: 'video-2',
        youtubeVideoId: 'V4cHXYW8R0I',
        youtubeUrl: 'https://www.youtube.com/watch?v=V4cHXYW8R0I',
        title: 'How to learn any language by yourself',
        thumbnail: 'https://i.ytimg.com/vi/V4cHXYW8R0I/maxresdefault.jpg',
        channelId: 'channel-2',
        channelLogo: 'https://yt3.ggpht.com/G-AFPZeAejVgK0Uh8Z5zAYitDSF6uDMI_PO5y1R2hsNI0KdO_6P6LG1RoWTTka2z_140b38v=s800-c-k-c0x00ffffff-no-rj',
        channelName: 'The Lang Space',
        duration: 344,
      },
      analysis: {
        id: 'analysis-2',
        language: 'th',
        status: 'COMPLETED',
        overview: null,
        createdAt: '2026-07-07T20:05:42.162Z',
      },
    },
    {
      videoId: 'video-3',
      viewCount: 44,
      rank: 3,
      video: {
        id: 'video-3',
        youtubeVideoId: 'N4amJBpOO8o',
        youtubeUrl: 'https://www.youtube.com/watch?v=N4amJBpOO8o',
        title: 'How to start YouTube from zero to 100k subscribers',
        thumbnail: 'https://i.ytimg.com/vi/N4amJBpOO8o/maxresdefault.jpg',
        channelId: 'channel-3',
        channelLogo: 'https://yt3.ggpht.com/mwrVTRwKQAuiDsHu82CArDeV_onIXvr72700qpuw9B3IDKAwP2YF35g6BBT-xawYdEhEhHYWq2k=s800-c-k-c0x00ffffff-no-rj',
        channelName: 'Friend Nattawut',
        duration: 925,
      },
      analysis: {
        id: 'analysis-3',
        language: 'th',
        status: 'COMPLETED',
        overview: null,
        createdAt: '2026-07-06T19:28:41.336Z',
      },
    },
  ],
  topUsersByDistinctVideosAnalyzed: [
    {
      userId: 'user-1',
      name: 'Jaran Donchaaim',
      email: 'jaran.dch@gmail.com',
      avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLu9HPYk_KX24gKK3H5W5hKxFX8AXbeM_iD12Ep0WNdOkpEOyBE=s96-c',
      distinctVideoCount: 12,
    },
    {
      userId: 'user-2',
      name: 'Nina Patel',
      email: 'nina@example.com',
      avatarUrl: 'https://i.pravatar.cc/96?img=5',
      distinctVideoCount: 9,
    },
    {
      userId: 'user-3',
      name: 'Arun Lee',
      email: 'arun@example.com',
      avatarUrl: 'https://i.pravatar.cc/96?img=8',
      distinctVideoCount: 7,
    },
  ],
};

function generateTrends(): DashboardReport['trends'] {
  const trends: DashboardReport['trends'] = [];
  const start = new Date('2026-06-06');

  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    trends.push({
      date: d.toISOString().slice(0, 10),
      newVideos: Math.floor(Math.random() * 12) + 2,
      newAnalyses: Math.floor(Math.random() * 15) + 3,
      events: Math.floor(Math.random() * 60) + 10,
      newUsers: Math.floor(Math.random() * 5) + 1,
    });
  }

  return trends;
}
