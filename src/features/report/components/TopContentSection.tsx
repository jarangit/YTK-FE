import { useTranslation } from 'react-i18next';
import { Hash, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DashboardReport } from '../types';

interface TopContentSectionProps {
  channels: DashboardReport['topContent']['channels'];
  keywords: DashboardReport['topContent']['keywords'];
}

function TopList<T>({
  items,
  labelKey,
  countKey,
  icon: Icon,
  title,
  subtitle,
}: {
  items: T[];
  labelKey: keyof T;
  countKey: keyof T;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]">
      <div className="mb-1 flex items-center gap-inline-sm">
        <Icon className="h-4 w-4 text-ink-faint" />
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <p className="mb-4 text-xs text-ink-faint">{subtitle}</p>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={String(item[labelKey])}
            className="flex items-center justify-between gap-inline-md"
          >
            <div className="flex items-center gap-inline-sm min-w-0">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  i < 3
                    ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                    : 'bg-[var(--color-bg-elevated)] text-ink-faint'
                }`}
              >
                {i + 1}
              </span>
              <span className="truncate text-sm text-ink">{String(item[labelKey])}</span>
            </div>
            <span className="shrink-0 text-sm font-medium text-ink-muted">
              {String(item[countKey])}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TopContentSection({ channels, keywords }: TopContentSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-inline-lg md:grid-cols-2">
      <TopList
        items={channels}
        labelKey="channelName"
        countKey="videoCount"
        icon={Play}
        title={t('report.topChannelsTitle')}
        subtitle={t('report.topChannelsSubtitle')}
      />
      <TopList
        items={keywords}
        labelKey="keyword"
        countKey="count"
        icon={Hash}
        title={t('report.topKeywordsTitle')}
        subtitle={t('report.topKeywordsSubtitle')}
      />
    </div>
  );
}
