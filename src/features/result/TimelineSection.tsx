import { useState } from 'react';
import { ChevronDown, Circle, Clock3 } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { AnalysisTimelineItem } from '../analysis/types';

interface TimelineSectionProps {
  timeline: AnalysisTimelineItem[];
  embedded?: boolean;
}

export default function TimelineSection({ timeline, embedded = false }: TimelineSectionProps) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (timeline.length === 0) return null;

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const content = (
    <>
      <div className="flex items-start gap-inline-sm">
        <Clock3 className="mt-1 h-4 w-4 text-accent" />
        <div>
          <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('resultTimeline.title')}</h2>
          <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('resultTimeline.subtitle')}</p>
        </div>
      </div>

      <div className="mt-stack-lg border-l border-accent/20 pl-5 sm:pl-7 space-y-stack-lg">
        {timeline.map((item, index) => {
          const open = openIndex === index;

          return (
            <article
              key={`${item.heading}-${index}`}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[39px]" />
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="flex w-full items-start gap-inline-sm rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card)]"
                aria-expanded={open}
                aria-controls={`timeline-item-${index}`}
              >
                <span className="mt-1 text-[11px] font-semibold tabular-nums uppercase tracking-[0.12em] text-accent/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.1rem] font-semibold leading-7 tracking-[-0.015em] text-ink">{item.heading}</h3>
                </div>
                <ChevronDown className={clsx('mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform', open && 'rotate-180')} />
              </button>

              <div
                id={`timeline-item-${index}`}
                className={clsx(
                  'grid transition-[grid-template-rows,opacity] duration-[var(--motion-duration-standard)]',
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pt-stack-md pl-[29px]">
                    {item.whatIsCovered && (
                      <p className="max-w-[38rem] text-[1rem] leading-8 text-ink">{item.whatIsCovered}</p>
                    )}
                    {item.importantDetails.length > 0 && (
                      <ul className="mt-stack-sm space-y-stack-sm">
                        {item.importantDetails.map((detail, detailIndex) => (
                          <li key={`${detail}-${detailIndex}`} className="flex items-start gap-inline-sm text-[15px] leading-7 text-ink-muted">
                            <Circle className="h-2.5 w-2.5 shrink-0 self-center fill-current text-accent/60" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="rounded-card border border-accent/20 bg-accent/[0.04] px-inset-lg py-inset-lg shadow-card">
          {content}
        </div>
      </div>
    </section>
  );
}
