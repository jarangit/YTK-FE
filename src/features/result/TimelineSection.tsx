import { Clock3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AnalysisTimelineItem } from '../analysis/types';

interface TimelineSectionProps {
  timeline: AnalysisTimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const { t } = useTranslation();

  if (timeline.length === 0) return null;

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <Clock3 className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('resultTimeline.title')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('resultTimeline.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg border-l border-accent/20 pl-5 sm:pl-7 space-y-stack-lg">
          {timeline.map((item, index) => (
            <article
              key={`${item.heading}-${index}`}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[39px]" />
              <div className="flex items-start gap-inline-sm">
                <span className="mt-1 text-[11px] font-semibold tabular-nums uppercase tracking-[0.12em] text-accent/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.1rem] font-semibold leading-7 tracking-[-0.015em] text-ink">{item.heading}</h3>
                  {item.whatIsCovered && (
                    <p className="mt-stack-xs max-w-[38rem] text-[1rem] leading-8 text-ink">{item.whatIsCovered}</p>
                  )}
                  {item.importantDetails.length > 0 && (
                    <ul className="mt-stack-sm space-y-stack-sm">
                      {item.importantDetails.map((detail, detailIndex) => (
                        <li key={`${detail}-${detailIndex}`} className="flex items-start gap-inline-sm text-[15px] leading-7 text-ink-muted">
                          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
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
    </section>
  );
}
