import { useId, useState } from 'react';
import {
  Check,
  ChevronDown,
  Compass,
  Lightbulb,
  ListChecks,
  MessageCircleQuestion,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { AnalysisSummary, ResearchRoadmap } from './types';
import Card from '../../shared/components/atoms/Card';

interface Props {
  summary: AnalysisSummary;
  defaultOpen?: boolean;
}

type DetailSection = 'fullSummary' | 'mentalModel' | 'researchRoadmap';
type RoadmapKey = keyof ResearchRoadmap;

const roadmapSections: Array<{
  key: RoadmapKey;
  icon: typeof Wrench;
  translationKey: string;
}> = [
  { key: 'tools', icon: Wrench, translationKey: 'summary.tools' },
  { key: 'trends', icon: TrendingUp, translationKey: 'summary.trends' },
  { key: 'concepts', icon: Search, translationKey: 'summary.concepts' },
  { key: 'deepQuestions', icon: MessageCircleQuestion, translationKey: 'summary.deepQuestions' },
];

export default function SummaryAccordion({ summary, defaultOpen = false }: Props) {
  const { t } = useTranslation();
  const detailsId = useId();
  const [detailsOpen, setDetailsOpen] = useState(defaultOpen);
  const [showAllTakeaways, setShowAllTakeaways] = useState(false);
  const [activeInsight, setActiveInsight] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<Set<DetailSection>>(new Set());
  const hasRoadmap = roadmapSections.some(({ key }) => summary.researchRoadmap[key].length > 0);
  const visibleTakeaways = showAllTakeaways
    ? summary.practicalTakeaways
    : summary.practicalTakeaways.slice(0, 3);

  const toggleSection = (section: DetailSection) => {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
          {t('summary.quickSummary')}
        </p>
        <h2 className="mt-stack-xs max-w-[46rem] font-display text-xl font-semibold leading-[1.55] text-ink sm:text-2xl">
          {summary.oneLineSummary || summary.summary}
        </h2>

        {summary.practicalTakeaways.length > 0 && (
          <section className="mt-stack-lg max-w-[46rem]" aria-labelledby={`${detailsId}-takeaways`}>
            <h3
              id={`${detailsId}-takeaways`}
              className="flex items-center gap-inline-xs text-sm font-semibold text-ink"
            >
              <ListChecks className="h-4 w-4 text-accent" />
              {t('summary.practicalTakeaways')}
              <span className="font-normal text-ink-faint">· {summary.practicalTakeaways.length}</span>
            </h3>
            <ul className="mt-stack-sm space-y-stack-sm">
              {visibleTakeaways.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                  <span className="mt-1 rounded-full bg-accent/10 p-1 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {summary.practicalTakeaways.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllTakeaways((current) => !current)}
                className="mt-stack-sm rounded-md text-sm font-semibold text-accent outline-none transition-colors hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-expanded={showAllTakeaways}
              >
                {showAllTakeaways ? t('summary.showLess') : t('summary.showAll')}
              </button>
            )}
          </section>
        )}

        <button
          type="button"
          onClick={() => setDetailsOpen((current) => !current)}
          className="mt-stack-lg flex w-full items-center justify-between border-t border-border/50 pt-stack-md text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
        >
          <span className="font-display text-base font-semibold text-ink">
            {t('summary.allDetails')}
          </span>
          <span className="flex items-center gap-inline-xs text-sm font-medium text-accent">
            {detailsOpen ? t('summary.hide') : t('summary.viewDetails')}
            <ChevronDown
              className={clsx(
                'h-4 w-4 transition-transform duration-[var(--motion-duration-standard)]',
                detailsOpen && 'rotate-180',
              )}
            />
          </span>
        </button>
      </div>

      <Collapsible open={detailsOpen} id={detailsId}>
        <div className="space-y-stack-lg border-t border-border/50 px-inset-md pb-inset-lg pt-inset-lg sm:px-inset-lg">
          {summary.keyInsights.length > 0 && (
            <section aria-labelledby={`${detailsId}-insights`}>
              <h3 id={`${detailsId}-insights`} className="font-display text-lg font-semibold text-ink">
                {t('summary.keyInsights')}
                <span className="ml-inline-xs font-sans text-sm font-normal text-ink-faint">
                  · {summary.keyInsights.length}
                </span>
              </h3>
              <div className="mt-stack-sm divide-y divide-border/50">
                {summary.keyInsights.map((item, index) => {
                  const isOpen = activeInsight === index;
                  const insightId = `${detailsId}-insight-${index}`;

                  return (
                    <article key={`${item.insight}-${index}`} className="py-stack-sm first:pt-0">
                      <button
                        type="button"
                        onClick={() => setActiveInsight(isOpen ? null : index)}
                        className="items-center flex w-full items-start gap-inline-sm rounded-md py-stack-xs text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        aria-expanded={isOpen}
                        aria-controls={insightId}
                      >
                        <span className="mt-0.5 text-xs font-semibold tabular-nums text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-sm font-semibold leading-7 text-ink">
                          {item.insight}
                        </span>
                        <ChevronDown
                          className={clsx('mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform', isOpen && 'rotate-180')}
                        />
                      </button>
                      <Collapsible open={isOpen} id={insightId}>
                        <dl className="ml-8 grid gap-stack-md pb-stack-sm pt-stack-xs sm:grid-cols-2">
                          {item.whyImportant && (
                            <InsightDetail
                              icon={Target}
                              label={t('summary.whyImportant')}
                              value={item.whyImportant}
                            />
                          )}
                          {item.mindsetChange && (
                            <InsightDetail
                              icon={RefreshCw}
                              label={t('summary.mindsetChange')}
                              value={item.mindsetChange}
                            />
                          )}
                        </dl>
                      </Collapsible>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {summary.summary && (
            <DetailAccordion
              id={`${detailsId}-full-summary`}
              label={t('summary.overview')}
              count={null}
              open={openSections.has('fullSummary')}
              onToggle={() => toggleSection('fullSummary')}
              icon={Lightbulb}
            >
              <p className="max-w-[46rem] text-sm leading-7 text-ink-muted">{summary.summary}</p>
            </DetailAccordion>
          )}

          {summary.mentalModel && (
            <DetailAccordion
              id={`${detailsId}-mental-model`}
              label={t('summary.mentalModel')}
              count={summary.mentalModel.steps.length}
              open={openSections.has('mentalModel')}
              onToggle={() => toggleSection('mentalModel')}
              icon={Compass}
            >
              {summary.mentalModel.name && (
                <h4 className="font-display text-base font-semibold text-ink">{summary.mentalModel.name}</h4>
              )}
              {summary.mentalModel.description && (
                <p className="mt-stack-xs max-w-[46rem] text-sm leading-7 text-ink-muted">
                  {summary.mentalModel.description}
                </p>
              )}
              {summary.mentalModel.steps.length > 0 && (
                <ol className="mt-stack-md max-w-[46rem] space-y-stack-sm">
                  {summary.mentalModel.steps.map((step, index) => (
                    <li key={`${step}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                      <span className="font-semibold tabular-nums text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </DetailAccordion>
          )}

          {hasRoadmap && (
            <DetailAccordion
              id={`${detailsId}-roadmap`}
              label={t('summary.researchRoadmap')}
              count={roadmapSections.filter(({ key }) => summary.researchRoadmap[key].length > 0).length}
              open={openSections.has('researchRoadmap')}
              onToggle={() => toggleSection('researchRoadmap')}
              icon={Compass}
            >
              <div className="grid gap-stack-md sm:grid-cols-2">
                {roadmapSections.map(({ key, icon: Icon, translationKey }) => {
                  const items = summary.researchRoadmap[key];
                  if (items.length === 0) return null;

                  return (
                    <section key={key}>
                      <h4 className="flex items-center gap-inline-xs text-sm font-semibold text-ink">
                        <Icon className="h-4 w-4 text-accent" />
                        {t(translationKey)}
                      </h4>
                      <ul className="mt-stack-xs space-y-stack-xs">
                        {items.map((item, index) => (
                          <li key={`${item}-${index}`} className="text-sm leading-7 text-ink-muted">
                            {key === 'deepQuestions' ? item : `• ${item}`}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </DetailAccordion>
          )}
        </div>
      </Collapsible>
    </Card>
  );
}

function Collapsible({ open, id, children }: { open: boolean; id: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className={clsx(
        'grid transition-[grid-template-rows,opacity] duration-[var(--motion-duration-standard)]',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function DetailAccordion({
  id,
  label,
  count,
  open,
  onToggle,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  count: number | null;
  open: boolean;
  onToggle: () => void;
  icon: typeof Lightbulb;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/50 pt-stack-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-inline-sm rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 "
        aria-expanded={open}
        aria-controls={id}
      >
        <Icon className="h-4 w-4 text-accent" />
        <span className="flex-1 font-display text-base font-semibold text-ink">{label}</span>
        {count !== null && <span className="text-sm text-ink-faint">· {count}</span>}
        <ChevronDown className={clsx('h-4 w-4 text-ink-faint transition-transform', open && 'rotate-180')} />
      </button>
      <Collapsible open={open} id={id}>
        <div className="pt-stack-md">{children}</div>
      </Collapsible>
    </section>
  );
}

function InsightDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-inline-xs text-xs font-semibold uppercase tracking-wide text-ink-faint">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-stack-xs text-sm leading-7 text-ink-muted">{value}</dd>
    </div>
  );
}
