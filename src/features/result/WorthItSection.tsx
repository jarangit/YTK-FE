import { AlertCircle, BadgeCheck, Gauge, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { WorthItSummary } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface WorthItSectionProps {
  worthIt?: WorthItSummary | null;
}

export default function WorthItSection({ worthIt }: WorthItSectionProps) {
  const { t } = useTranslation();

  if (!worthIt) return null;

  const hasDifficulty = worthIt.difficulty.length > 0;
  const hasEstimatedValue = worthIt.estimatedValue.length > 0;
  const hasBestFor = worthIt.bestFor.length > 0;
  const hasSkipIf = worthIt.skipIf.length > 0;

  if (!hasDifficulty && !hasEstimatedValue && !hasBestFor && !hasSkipIf) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-ink">{t('worthIt.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('worthIt.subtitle')}</p>
          </div>
        </div>

        {hasDifficulty && (
          <div className="mt-stack-md inline-flex items-center gap-inline-xs rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <Gauge className="h-4 w-4" />
            <span>{t('worthIt.difficulty')}</span>
            <span className="text-ink">· {worthIt.difficulty}</span>
          </div>
        )}

        {hasEstimatedValue && (
          <div className="mt-stack-md rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
            <p className="flex items-center gap-inline-xs text-sm font-semibold text-ink">
              <BadgeCheck className="h-4 w-4 text-accent" />
              {t('worthIt.estimatedValue')}
            </p>
            <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{worthIt.estimatedValue}</p>
          </div>
        )}

        <div className="mt-stack-md grid gap-stack-md sm:grid-cols-2">
          {hasBestFor && (
            <section className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
              <h3 className="flex items-center gap-inline-xs font-display text-base font-semibold text-ink">
                <BadgeCheck className="h-4 w-4 text-accent" />
                {t('worthIt.bestFor')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {worthIt.bestFor.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasSkipIf && (
            <section className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
              <h3 className="flex items-center gap-inline-xs font-display text-base font-semibold text-ink">
                <AlertCircle className="h-4 w-4 text-danger" />
                {t('worthIt.skipIf')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {worthIt.skipIf.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                    <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-danger" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Card>
  );
}
