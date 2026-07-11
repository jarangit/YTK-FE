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
  topViewedVideos: Array<{
    videoId: string;
    viewCount: number;
    rank: number;
    video: {
      id: string;
      youtubeVideoId: string;
      youtubeUrl: string;
      title: string;
      thumbnail: string;
      channelId: string;
      channelLogo: string;
      channelName: string;
      duration: number;
    };
    analysis: {
      id: string;
      language: string;
      status: string;
      overview: string | null;
      createdAt: string;
    };
  }>;
  topUsersByDistinctVideosAnalyzed: Array<{
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    distinctVideoCount: number;
  }>;
}

export type PeriodOption = '7d' | '30d' | '90d';
