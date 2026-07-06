import { MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { EngagementQuestion } from '../analysis/types';

interface EngagementQuestionsSectionProps {
  questions: EngagementQuestion[];
}

export default function EngagementQuestionsSection({ questions }: EngagementQuestionsSectionProps) {
  const { t } = useTranslation();

  if (questions.length === 0) return null;

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <MessageCircleQuestion className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('engagementQuestions.title')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('engagementQuestions.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg space-y-stack-lg">
          {questions.map((item, index) => (
            <article
              key={`${item.question}-${index}`}
              className="border-l border-accent/20 pl-5 sm:pl-6"
            >
              <div className="flex items-start gap-inline-sm">
                <span className="mt-1 text-[11px] font-semibold tabular-nums uppercase tracking-[0.12em] text-accent/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1 space-y-stack-sm">
                  <div>
                    <h3 className="max-w-[38rem] font-display text-[1.1rem] font-semibold leading-7 tracking-[-0.015em] text-ink">{item.question}</h3>
                    {item.hook && (
                      <p className="mt-stack-xs inline-flex items-center gap-inline-xs rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm font-medium text-ink">
                        <Sparkles className="h-3.5 w-3.5" />
                        {item.hook}
                      </p>
                    )}
                  </div>

                  {item.answer && (
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        {t('engagementQuestions.answer')}
                      </p>
                      <p className="mt-stack-xs max-w-[38rem] text-[15px] leading-7 text-ink-muted">{item.answer}</p>
                    </div>
                  )}

                  {item.whyInteresting && (
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        {t('engagementQuestions.whyInteresting')}
                      </p>
                      <p className="mt-stack-xs max-w-[38rem] text-[15px] leading-7 text-ink-muted">{item.whyInteresting}</p>
                    </div>
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
