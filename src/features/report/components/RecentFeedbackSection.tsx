import { useTranslation } from 'react-i18next';
import { MessageSquare, ExternalLink } from 'lucide-react';
import Badge from '../../../shared/components/atoms/Badge';
import { FEEDBACK_RATINGS, FEEDBACK_REASONS, type FeedbackRating, type FeedbackReason } from '../../feedback/types';
import type { DashboardReport } from '../types';

interface RecentFeedbackSectionProps {
  feedback: DashboardReport['recentFeedback'];
}

function isFeedbackRating(value: string): value is FeedbackRating {
  return (FEEDBACK_RATINGS as string[]).includes(value);
}

function isFeedbackReason(value: string): value is FeedbackReason {
  return (FEEDBACK_REASONS as string[]).includes(value);
}

export default function RecentFeedbackSection({ feedback }: RecentFeedbackSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]">
      <div className="mb-1 flex items-center gap-inline-sm">
        <MessageSquare className="h-4 w-4 text-ink-faint" />
        <h3 className="text-sm font-semibold text-ink">{t('report.recentFeedbackTitle')}</h3>
      </div>
      <p className="mb-4 text-xs text-ink-faint">{t('report.recentFeedbackSubtitle')}</p>

      {feedback.length === 0 ? (
        <p className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-3 text-sm text-ink-muted">
          {t('report.recentFeedbackEmpty')}
        </p>
      ) : (
        <ul className="space-y-3">
          {feedback.map((item) => (
            <li
              key={item.id}
              className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-3"
            >
              <div className="flex flex-wrap items-center gap-inline-xs">
                <Badge>
                  {isFeedbackRating(item.rating) ? t(`feedback.rating.${item.rating}`) : item.rating}
                </Badge>
                {item.reasons.map((reason) => (
                  <Badge key={reason}>
                    {isFeedbackReason(reason) ? t(`feedback.reason.${reason}`) : reason}
                  </Badge>
                ))}
              </div>

              <p className="mt-2 text-sm text-ink">
                {item.comment || <span className="text-ink-faint">{t('report.recentFeedbackNoComment')}</span>}
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-inline-sm text-xs text-ink-faint">
                <span className="truncate">
                  {item.user?.name || item.user?.email || t('report.recentFeedbackAnonymous')}
                  {' · '}
                  {new Date(item.createdAt).toLocaleString()}
                </span>

                {item.analysisId && (
                  <a
                    href={`/result?analysisId=${encodeURIComponent(item.analysisId)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-inline-xs font-medium text-[var(--color-accent)] no-underline hover:underline"
                  >
                    {t('report.recentFeedbackViewAnalysis')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
