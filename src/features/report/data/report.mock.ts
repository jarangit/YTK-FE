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
