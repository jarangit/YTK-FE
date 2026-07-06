import { BriefcaseBusiness, Gauge, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CareerInference } from '../analysis/types';

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
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <BriefcaseBusiness className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('careerInference.title')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('careerInference.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-md inline-flex items-center gap-inline-xs rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm font-medium text-ink-muted">
          <Gauge className="h-4 w-4 text-accent" />
          <span>{t('careerInference.confidence')}</span>
          <span className="text-ink">· {t(`careerInference.level.${careerInference.confidence}`)}</span>
        </div>

        <div className="mt-stack-md grid gap-stack-md sm:grid-cols-2">
          {careerInference.likelyRoles.length > 0 && (
            <section className="border-l border-accent/20 pl-5 sm:pl-6">
              <h3 className="flex items-center gap-inline-xs font-display text-[1.02rem] font-semibold text-ink">
                <BriefcaseBusiness className="h-4 w-4 text-accent" />
                {t('careerInference.likelyRoles')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {careerInference.likelyRoles.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-[15px] leading-7 text-ink-muted">
                    <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {careerInference.recommendedTopics.length > 0 && (
            <section className="border-l border-accent/20 pl-5 sm:pl-6">
              <h3 className="flex items-center gap-inline-xs font-display text-[1.02rem] font-semibold text-ink">
                <Target className="h-4 w-4 text-accent" />
                {t('careerInference.recommendedTopics')}
              </h3>
              <ul className="mt-stack-sm space-y-stack-sm">
                {careerInference.recommendedTopics.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-[15px] leading-7 text-ink-muted">
                    <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {careerInference.reasoning && (
          <div className="mt-stack-md border-l border-accent/20 pl-5 sm:pl-6">
            <h3 className="font-display text-[1.02rem] font-semibold text-ink">{t('careerInference.reasoning')}</h3>
            <p className="mt-stack-xs max-w-[38rem] text-[15px] leading-7 text-ink-muted">{careerInference.reasoning}</p>
          </div>
        )}

        {careerInference.personalizedAdvice.length > 0 && (
          <section className="mt-stack-md border-l border-accent/20 pl-5 sm:pl-6">
            <h3 className="flex items-center gap-inline-xs font-display text-[1.02rem] font-semibold text-ink">
              <Lightbulb className="h-4 w-4 text-accent" />
              {t('careerInference.personalizedAdvice')}
            </h3>
            <ul className="mt-stack-sm space-y-stack-sm">
              {careerInference.personalizedAdvice.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-inline-sm text-[15px] leading-7 text-ink-muted">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
