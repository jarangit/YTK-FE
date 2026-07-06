export interface DashboardReport {
  summary: {
    users: {
      total: number;
      newToday: number;
      newThisWeek: number;
      newThisMonth: number;
    };
    videos: {
      total: number;
      byStatus: Record<string, number>;
      failureRate: number;
    };
    analyses: {
      total: number;
      byLanguage: Record<string, number>;
      failureRate: number;
    };
    engagement: {
      totalEvents: number;
      totalLibrarySaves: number;
      totalFeedItems: number;
      eventsByType: Record<string, number>;
    };
  };
  trends: Array<{
    date: string;
    newVideos: number;
    newAnalyses: number;
    events: number;
    newUsers: number;
  }>;
  topContent: {
    channels: Array<{ channelName: string; videoCount: number }>;
    keywords: Array<{ keyword: string; count: number }>;
  };
}

export type PeriodOption = '7d' | '30d' | '90d';
