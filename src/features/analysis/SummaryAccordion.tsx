import { useState } from 'react';
import { ChevronDown, Lightbulb, List, BookOpen, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { VideoAnalysis } from './types';
import Card from '../../shared/components/atoms/Card';

interface Props {
  summary: VideoAnalysis['summary'];
  defaultOpen?: boolean;
}

export default function SummaryAccordion({ summary, defaultOpen = false }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card as="div" className="bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-inset-md sm:p-inset-lg text-left transition-colors hover:bg-black/[0.02]"
        aria-expanded={open}
      >
        <h2 className="font-display font-semibold text-lg text-ink">
          {t('summary.fullSummary')}
        </h2>
        <span className="flex items-center gap-inline-xs text-sm font-medium text-accent">
          {open ? t('summary.hide') : t('summary.read')}
          <ChevronDown
            className={clsx(
              'reduce-motion-transitions h-4 w-4 transition-transform duration-[var(--motion-duration-standard)]',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>

      <div
        className={clsx(
          'reduce-motion-transitions grid transition-[grid-template-rows,opacity] duration-[var(--motion-duration-standard)] ease-[var(--motion-easing-standard)]',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
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
    </Card>
  );
}
