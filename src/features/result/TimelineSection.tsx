import { Clock3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AnalysisTimelineItem } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface TimelineSectionProps {
  timeline: AnalysisTimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const { t } = useTranslation();

  if (timeline.length === 0) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <Clock3 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('resultTimeline.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('resultTimeline.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-md">
          {timeline.map((item, index) => (
            <article
              key={`${item.heading}-${index}`}
              className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm"
            >
              <div className="flex items-start gap-inline-sm">
                <span className="mt-0.5 text-xs font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold leading-7 text-ink">{item.heading}</h3>
                  {item.whatIsCovered && (
                    <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.whatIsCovered}</p>
                  )}
                  {item.importantDetails.length > 0 && (
                    <ul className="mt-stack-sm space-y-stack-sm">
                      {item.importantDetails.map((detail, detailIndex) => (
                        <li key={`${detail}-${detailIndex}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
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
