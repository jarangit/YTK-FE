import { useTranslation } from 'react-i18next';
import { Users, Video, BarChart3, Activity, MessageSquare } from 'lucide-react';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import PageLayout from '../../shared/components/organisms/PageLayout';
import PageHeader from '../../shared/components/organisms/PageHeader';
import StatCard from './components/StatCard';
import PeriodSelector from './components/PeriodSelector';
import TrendChart from './components/TrendChart';
import TopContentSection from './components/TopContentSection';
import TopViewedVideosSection from './components/TopViewedVideosSection';
import TopUsersSection from './components/TopUsersSection';
import RecentFeedbackSection from './components/RecentFeedbackSection';
import { useDashboardQuery } from './hooks/useDashboardQuery';
import type { PeriodOption } from './types';
import { useState } from 'react';

export default function ReportDashboard() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<PeriodOption>('30d');
  const { data, isPending, isError, refetch } = useDashboardQuery(period);

  const transitionKey = isPending ? 'loading' : isError ? 'error' : data ? 'success' : 'idle';
  const analysisEnglishCount = data?.summary.analyses.byLanguage.en ?? 0;
  const analysisThaiCount = data?.summary.analyses.byLanguage.th ?? 0;

  return (
    <PageLayout width="content">
      <PageHeader
        eyebrow={t('report.eyebrow')}
        title={t('report.title')}
        subtitle={t('report.subtitle')}
        className="mb-stack-lg"
      />

      <div className="mb-stack-lg flex items-center justify-between">
        <span className="text-sm font-medium text-ink-muted">{t('report.periodLabel')}</span>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <ContentTransition transitionKey={transitionKey}>
        {isPending ? (
          <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg"
              >
                <div className="mb-3 h-5 w-24 rounded bg-[var(--color-bg-elevated)]" />
                <div className="mb-1 h-8 w-20 rounded bg-[var(--color-bg-elevated)]" />
                <div className="h-4 w-32 rounded bg-[var(--color-bg-elevated)]" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg text-center">
            <p className="text-sm font-semibold text-ink">{t('report.errorTitle')}</p>
            <p className="mt-1 text-sm text-ink-muted">{t('report.errorSubtitle')}</p>
            <button
              onClick={() => void refetch()}
              className="mt-4 inline-flex items-center gap-inline-xs rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-[var(--color-accent-contrast)]"
            >
              {t('report.retry')}
            </button>
          </div>
        ) : data ? (
          <div className="space-y-stack-lg">
            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                icon={<Users className="h-4 w-4 text-[var(--color-accent)]" />}
                label={t('report.statUsers')}
                value={data.summary.users.total.toLocaleString()}
                subtitle={t('report.statUsersSub')}
                detail={t('report.statNewToday', { count: data.summary.users.newToday })}
                accentColor="var(--color-accent-light)"
              />
              <StatCard
                icon={<Video className="h-4 w-4 text-[var(--color-success)]" />}
                label={t('report.statVideos')}
                value={data.summary.videos.total.toLocaleString()}
                subtitle={t('report.statVideosSub')}
                detail={t('report.statByStatus', {
                  completed: data.summary.videos.byStatus.COMPLETED ?? 0,
                  pending: (data.summary.videos.byStatus.PENDING ?? 0) + (data.summary.videos.byStatus.PROCESSING ?? 0),
                  failed: data.summary.videos.byStatus.FAILED ?? 0,
                })}
                accentColor="color-mix(in srgb, var(--color-success) 15%, transparent)"
              />
              <StatCard
                icon={<BarChart3 className="h-4 w-4 text-[var(--color-warning)]" />}
                label={t('report.statAnalyses')}
                value={data.summary.analyses.total.toLocaleString()}
                subtitle={t('report.statAnalysesSub')}
                detail={`EN ${analysisEnglishCount} · TH ${analysisThaiCount}`}
                accentColor="color-mix(in srgb, var(--color-warning) 15%, transparent)"
              />
              <StatCard
                icon={<Activity className="h-4 w-4 text-[var(--color-text-tertiary)]" />}
                label={t('report.statEngagement')}
                value={data.summary.engagement.totalEvents.toLocaleString()}
                subtitle={t('report.statEngagementSub')}
                detail={t('report.statByStatus', {
                  completed: data.summary.engagement.totalLibrarySaves,
                  pending: data.summary.engagement.totalFeedItems,
                  failed: 0,
                })}
                accentColor="color-mix(in srgb, var(--color-text-tertiary) 15%, transparent)"
              />
              <StatCard
                icon={<MessageSquare className="h-4 w-4 text-[var(--color-accent)]" />}
                label={t('report.statFeedback')}
                value={data.feedbackSummary.total.toLocaleString()}
                subtitle={t('report.statFeedbackSub')}
                detail={t('report.statNewToday', { count: data.feedbackSummary.newToday })}
                accentColor="var(--color-accent-light)"
              />
            </div>

            {/* ── Trend Chart ── */}
            <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]">
              <h3 className="mb-1 text-sm font-semibold text-ink">{t('report.trendTitle')}</h3>
              <p className="mb-4 text-xs text-ink-faint">{t('report.trendSubtitle')}</p>
              <TrendChart data={data.trends} />
            </div>

            {/* ── Top Content ── */}
            <TopContentSection
              channels={data.topContent.channels}
              keywords={data.topContent.keywords}
            />

            <div className="grid grid-cols-1 gap-inline-lg xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
              <TopViewedVideosSection videos={data.topViewedVideos} />
              <TopUsersSection users={data.topUsersByDistinctVideosAnalyzed} />
            </div>

            <RecentFeedbackSection feedback={data.recentFeedback} />
          </div>
        ) : null}
      </ContentTransition>
    </PageLayout>
  );
}
