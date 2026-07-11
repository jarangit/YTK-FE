import { useTranslation } from 'react-i18next';
import { Eye, Languages, PlayCircle } from 'lucide-react';
import type { DashboardReport } from '../types';

interface TopViewedVideosSectionProps {
  videos: DashboardReport['topViewedVideos'];
}

export default function TopViewedVideosSection({ videos }: TopViewedVideosSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]">
      <div className="mb-1 flex items-center gap-inline-sm">
        <Eye className="h-4 w-4 text-ink-faint" />
        <h3 className="text-sm font-semibold text-ink">{t('report.topViewedVideosTitle')}</h3>
      </div>
      <p className="mb-4 text-xs text-ink-faint">{t('report.topViewedVideosSubtitle')}</p>

      <div className="space-y-3">
        {videos.map((item) => (
          <a
            key={item.videoId}
            href={item.video.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex gap-inline-md rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-3 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <img
              src={item.video.thumbnail}
              alt={item.video.title}
              className="h-20 w-32 shrink-0 rounded-[calc(var(--card-radius)-6px)] object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-start justify-between gap-inline-md">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-semibold text-ink">{item.video.title}</p>
                  <p className="mt-1 text-xs text-ink-muted">{item.video.channelName}</p>
                </div>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-xs font-semibold text-[var(--color-accent)]">
                  {item.rank}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-faint">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {t('report.topViewedVideosViews', { count: item.viewCount.toLocaleString() })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Languages className="h-3.5 w-3.5" />
                  {item.analysis.language.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <PlayCircle className="h-3.5 w-3.5" />
                  {item.analysis.status}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
