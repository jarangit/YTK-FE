import { MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { EngagementQuestion } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface EngagementQuestionsSectionProps {
  questions: EngagementQuestion[];
}

export default function EngagementQuestionsSection({ questions }: EngagementQuestionsSectionProps) {
  const { t } = useTranslation();

  if (questions.length === 0) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <MessageCircleQuestion className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('engagementQuestions.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('engagementQuestions.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-md">
          {questions.map((item, index) => (
            <article
              key={`${item.question}-${index}`}
              className="rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm"
            >
              <div className="flex items-start gap-inline-sm">
                <span className="mt-0.5 text-xs font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1 space-y-stack-sm">
                  <div>
                    <h3 className="font-display text-base font-semibold leading-7 text-ink">{item.question}</h3>
                    {item.hook && (
                      <p className="mt-stack-xs inline-flex items-center gap-inline-xs rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                        {item.hook}
                      </p>
                    )}
                  </div>

                  {item.answer && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                        {t('engagementQuestions.answer')}
                      </p>
                      <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.answer}</p>
                    </div>
                  )}

                  {item.whyInteresting && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                        {t('engagementQuestions.whyInteresting')}
                      </p>
                      <p className="mt-stack-xs text-sm leading-7 text-ink-muted">{item.whyInteresting}</p>
                    </div>
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
