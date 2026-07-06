import { BriefcaseBusiness, Gauge, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CareerInference } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface CareerInferenceSectionProps {
  careerInference?: CareerInference | null;
}

export default function CareerInferenceSection({ careerInference }: CareerInferenceSectionProps) {
  const { t } = useTranslation();

  if (!careerInference) return null;

  const hasContent = careerInference.likelyRoles.length > 0
    || careerInference.reasoning.length > 0
    || careerInference.recommendedTopics.length > 0
    || careerInference.personalizedAdvice.length > 0;

  if (!hasContent) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('careerInference.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('careerInference.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-md inline-flex items-center gap-inline-xs rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          <Gauge className="h-4 w-4" />
          <span>{t('careerInference.confidence')}</span>
          <span className="text-ink">· {t(`careerInference.level.${careerInference.confidence}`)}</span>
        </div>

        <div className="mt-stack-md grid gap-stack-md sm:grid-cols-2">
          {careerInference.likelyRoles.length > 0 && (
            <section className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
              <h3 className="flex items-center gap-inline-xs font-display text-base font-semibold text-ink">
                <BriefcaseBusiness className="h-4 w-4 text-accent" />
                {t('careerInference.likelyRoles')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {careerInference.likelyRoles.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {careerInference.recommendedTopics.length > 0 && (
            <section className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
              <h3 className="flex items-center gap-inline-xs font-display text-base font-semibold text-ink">
                <Target className="h-4 w-4 text-accent" />
                {t('careerInference.recommendedTopics')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {careerInference.recommendedTopics.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {careerInference.reasoning && (
          <div className="mt-stack-md rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
            <h3 className="font-display text-base font-semibold text-ink">{t('careerInference.reasoning')}</h3>
            <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{careerInference.reasoning}</p>
          </div>
        )}

        {careerInference.personalizedAdvice.length > 0 && (
          <section className="mt-stack-md rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm">
            <h3 className="flex items-center gap-inline-xs font-display text-base font-semibold text-ink">
              <Lightbulb className="h-4 w-4 text-accent" />
              {t('careerInference.personalizedAdvice')}
            </h3>
            <ul className="mt-stack-sm space-y-stack-sm">
              {careerInference.personalizedAdvice.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-sm leading-7 text-ink-muted">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Card>
  );
}
