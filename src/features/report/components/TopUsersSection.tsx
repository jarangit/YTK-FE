import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';
import type { DashboardReport } from '../types';

interface TopUsersSectionProps {
  users: DashboardReport['topUsersByDistinctVideosAnalyzed'];
}

export default function TopUsersSection({ users }: TopUsersSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]">
      <div className="mb-1 flex items-center gap-inline-sm">
        <Users className="h-4 w-4 text-ink-faint" />
        <h3 className="text-sm font-semibold text-ink">{t('report.topUsersTitle')}</h3>
      </div>
      <p className="mb-4 text-xs text-ink-faint">{t('report.topUsersSubtitle')}</p>

      <ul className="space-y-3">
        {users.map((user, index) => (
          <li
            key={user.userId}
            className="flex items-center gap-inline-md rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-xs font-semibold text-[var(--color-accent)]">
              {index + 1}
            </span>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-ink-muted">{user.email}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-ink">{user.distinctVideoCount.toLocaleString()}</p>
              <p className="text-xs text-ink-faint">{t('report.topUsersDistinctVideos')}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
