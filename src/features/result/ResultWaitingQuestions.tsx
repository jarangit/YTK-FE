import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';
import InsightsQuestionCard from '../insights/InsightsQuestionCard';
import { useEngagementQuestionsQuery } from '../insights/hooks/useEngagementQuestionsQuery';
import ResultLoadingSpinner from './ResultLoadingSpinner';

export default function ResultWaitingQuestions() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useEngagementQuestionsQuery('', 10, true);
  const items = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  return (
    <main className="min-h-[calc(100vh-var(--app-header-height))] bg-[var(--color-bg-app)] px-inset-lg py-stack-xl">
      <section className="mx-auto w-full max-w-[var(--content-max-width)]">
        <div className="mb-stack-xl rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg">
          <ResultLoadingSpinner />
        </div>

        <div className="mb-stack-lg">
          <Text as="p" variant="label" color="secondary" className="mb-stack-sm normal-case tracking-[0.08em]">
            {t('result.waitingQuestionsEyebrow')}
          </Text>
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {t('result.waitingQuestionsTitle')}
          </h2>
          <Text as="p" variant="body" color="secondary" className="mt-stack-sm max-w-read leading-7">
            {t('result.waitingQuestionsSubtitle')}
          </Text>
        </div>

        {isLoading && (
          <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg text-sm text-ink-muted">
            {t('result.waitingQuestionsLoading')}
          </div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <div className="grid grid-cols-1 gap-inline-xl">
            {items.map((item, index) => (
              <InsightsQuestionCard key={`${item.analysisId}:${item.video.id}:${index}`} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
