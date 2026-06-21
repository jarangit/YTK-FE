import { useState } from 'react';
import {
  AlertTriangle,
  BookOpenText,
  ChevronDown,
  FileText,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { AnalysisSummary } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface AnalysisExtrasSectionProps {
  summary: AnalysisSummary;
}

type SectionKey = 'detailedExplanation' | 'importantDetails' | 'examples' | 'limitations';

export default function AnalysisExtrasSection({ summary }: AnalysisExtrasSectionProps) {
  const { t } = useTranslation();
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set(['detailedExplanation']));

  const sections = [
    {
      key: 'detailedExplanation' as const,
      icon: BookOpenText,
      label: t('analysisExtras.detailedExplanation'),
      count: summary.detailedExplanation.length,
      content: summary.detailedExplanation.length > 0 ? (
        <div className="space-y-stack-md">
          {summary.detailedExplanation.map((item, index) => (
            <article
              key={`${item.topic}-${index}`}
              className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm"
            >
              <h4 className="font-display text-base font-semibold text-ink">
                {item.topic || t('analysisExtras.untitledTopic', { index: index + 1 })}
              </h4>
              <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.explanation}</p>
            </article>
          ))}
        </div>
      ) : null,
    },
    {
      key: 'importantDetails' as const,
      icon: ListChecks,
      label: t('analysisExtras.importantDetails'),
      count: summary.importantDetails.length,
      content: summary.importantDetails.length > 0 ? (
        <ul className="space-y-stack-sm">
          {summary.importantDetails.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      key: 'examples' as const,
      icon: Sparkles,
      label: t('analysisExtras.examples'),
      count: summary.examples.length,
      content: summary.examples.length > 0 ? (
        <div className="grid gap-stack-md">
          {summary.examples.map((item, index) => (
            <article
              key={`${item.topic}-${index}`}
              className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm"
            >
              <h4 className="font-display text-base font-semibold text-ink">
                {item.topic || t('analysisExtras.exampleLabel', { index: index + 1 })}
              </h4>
              <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.example}</p>
            </article>
          ))}
        </div>
      ) : null,
    },
    {
      key: 'limitations' as const,
      icon: AlertTriangle,
      label: t('analysisExtras.limitations'),
      count: summary.limitations.length,
      content: summary.limitations.length > 0 ? (
        <ul className="space-y-stack-sm">
          {summary.limitations.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
              <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-danger" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
  ].filter((section) => section.count > 0);

  if (sections.length === 0) return null;

  const toggleSection = (key: SectionKey) => {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('analysisExtras.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('analysisExtras.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-md">
          {sections.map(({ key, icon: Icon, label, count, content }) => {
            const open = openSections.has(key);

            return (
              <section key={key} className="border-t border-border/50 pt-stack-md first:border-t-0 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggleSection(key)}
                  className="flex w-full items-center gap-inline-sm rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-expanded={open}
                  aria-controls={`analysis-extras-${key}`}
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="flex-1 font-display text-base font-semibold text-ink">{label}</span>
                  <span className="text-sm text-ink-faint">· {count}</span>
                  <ChevronDown className={clsx('h-4 w-4 text-ink-faint transition-transform', open && 'rotate-180')} />
                </button>

                <div
                  id={`analysis-extras-${key}`}
                  className={clsx(
                    'grid transition-[grid-template-rows,opacity] duration-[var(--motion-duration-standard)]',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pt-stack-md">{content}</div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
