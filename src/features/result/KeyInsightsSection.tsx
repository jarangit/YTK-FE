import { Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ImportantPoint } from '../analysis/types';

interface KeyInsightsSectionProps {
  insights: ImportantPoint[];
}

export default function KeyInsightsSection({ insights }: KeyInsightsSectionProps) {
  const { t } = useTranslation();

  if (insights.length === 0) return null;

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <Lightbulb className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('summary.keyInsights')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('resultInsights.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-lg">
          {insights.map((item, index) => (
            <article
              key={`${item.point}-${index}`}
              className="border-l border-accent/20 pl-5 sm:pl-6"
            >
              <div className="flex items-start gap-inline-sm">
                <span className="mt-1 text-[11px] font-semibold tabular-nums uppercase tracking-[0.12em] text-accent/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.1rem] font-semibold leading-7 tracking-[-0.015em] text-ink">{item.point}</h3>
                  {item.whyItMatters && (
                    <dl className="mt-stack-sm">
                      <div>
                        <dt className="flex items-center gap-inline-xs text-[11px] font-semibold uppercase tracking-[0.12em] text-accent/80">
                          <Target className="h-3.5 w-3.5 text-accent" />
                          {t('summary.whyImportant')}
                        </dt>
                        <dd className="mt-stack-xs max-w-[38rem] text-[15px] leading-7 text-ink-muted">{item.whyItMatters}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
