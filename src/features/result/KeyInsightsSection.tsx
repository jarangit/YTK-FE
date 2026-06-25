import { Lightbulb, RefreshCw, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { KeyInsight } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface KeyInsightsSectionProps {
  insights: KeyInsight[];
}

export default function KeyInsightsSection({ insights }: KeyInsightsSectionProps) {
  const { t } = useTranslation();

  if (insights.length === 0) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('summary.keyInsights')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('resultInsights.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-md">
          {insights.map((item, index) => (
            <article
              key={`${item.insight}-${index}`}
              className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm"
            >
              <div className="flex items-start gap-inline-sm">
                <span className="mt-0.5 text-xs font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold leading-7 text-ink">{item.insight}</h3>
                  {(item.whyImportant || item.mindsetChange) && (
                    <dl className="mt-stack-sm grid gap-stack-md sm:grid-cols-2">
                      {item.whyImportant && (
                        <div>
                          <dt className="flex items-center gap-inline-xs text-xs font-semibold uppercase tracking-wide text-ink-faint">
                            <Target className="h-3.5 w-3.5" />
                            {t('summary.whyImportant')}
                          </dt>
                          <dd className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.whyImportant}</dd>
                        </div>
                      )}
                      {item.mindsetChange && (
                        <div>
                          <dt className="flex items-center gap-inline-xs text-xs font-semibold uppercase tracking-wide text-ink-faint">
                            <RefreshCw className="h-3.5 w-3.5" />
                            {t('resultInsights.howToApply')}
                          </dt>
                          <dd className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.mindsetChange}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
