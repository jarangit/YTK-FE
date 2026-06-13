import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, List, BookOpen, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { VideoAnalysis } from './types';

interface Props {
  summary: VideoAnalysis['summary'];
}

export default function SummaryAccordion({ summary }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-inset-md sm:p-inset-lg text-left transition-colors hover:bg-black/[0.02]"
      >
        <h2 className="font-display font-semibold text-lg text-ink">
          {t('summary.fullSummary')}
        </h2>
        <span className="flex items-center gap-inline-xs text-sm font-medium text-accent">
          {open ? (
            <>
              {t('summary.hide')} <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {t('summary.read')} <ChevronDown className="w-4 h-4" />
            </>
          )}
        </span>
      </button>

      <div
        className={clsx(
          'transition-all duration-300 ease-in-out',
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden',
        )}
      >
        <div className="px-inset-md sm:px-inset-lg pb-inset-md sm:pb-inset-lg space-y-stack-md border-t border-border/50 pt-inset-md">
          <section>
            <h3 className="flex items-center gap-inline-xs text-sm font-semibold text-ink mb-stack-sm">
              <Lightbulb className="w-4 h-4 text-accent" />
              {t('summary.bigIdea')}
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              {summary.bigIdea}
            </p>
          </section>

          <section>
            <h3 className="flex items-center gap-inline-xs text-sm font-semibold text-ink mb-stack-sm">
              <List className="w-4 h-4 text-accent" />
              {t('summary.keyPoints')}
            </h3>
            <ul className="space-y-stack-xs">
              {summary.keyPoints.map((point, i) => (
                <li key={i} className="text-sm text-ink-muted leading-relaxed flex items-start gap-inline-sm">
                  <span className="text-accent mt-0.5 shrink-0">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-inline-xs text-sm font-semibold text-ink mb-stack-sm">
              <BookOpen className="w-4 h-4 text-accent" />
              {t('summary.usefulExamples')}
            </h3>
            <ul className="space-y-stack-sm">
              {summary.usefulExamples.map((ex, i) => (
                <li
                  key={i}
                  className="text-sm text-ink-muted leading-relaxed bg-surface rounded-lg px-inset-md py-stack-sm italic"
                >
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="flex items-center gap-inline-xs text-sm font-semibold text-ink mb-stack-sm">
              <RefreshCw className="w-4 h-4 text-accent" />
              {t('summary.thingsToRemember')}
            </h3>
            <ul className="space-y-stack-xs">
              {summary.thingsToRemember.map((item, i) => (
                <li key={i} className="text-sm text-ink-muted leading-relaxed flex items-start gap-inline-sm">
                  <span className="text-accent mt-0.5 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
