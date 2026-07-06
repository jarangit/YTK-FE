import { useTranslation, Trans } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import UrlInputForm from './UrlInputForm';
import ExampleAnalysisState from './ExampleAnalysisState';
import { useHomeFeaturedAnalysisQuery } from './hooks/useHomeFeaturedAnalysisQuery';
import { useFeedQuery } from '../feed/hooks/useFeedQuery';
import FeedCard from '../feed/FeedCard';

export default function HomePage() {
  const { t } = useTranslation();
  const {
    data: featuredItem,
    isPending: isExamplePending,
    isError: isExampleError,
    refetch: refetchExample,
  } = useHomeFeaturedAnalysisQuery();
  const {
    data: feedPreviewData,
    isLoading: isFeedPreviewLoading,
  } = useFeedQuery('', undefined, 3);
  const feedPreviewItems = feedPreviewData?.pages.flatMap((page) => page.items).slice(0, 3) ?? [];
  const exampleTransitionKey = isExamplePending ? 'loading' : isExampleError ? 'error' : 'success';

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg-app)]">
      <section className="px-inset-lg pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-[1120px]">
          <ContentTransition transitionKey="home-hero">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mx-auto max-w-[760px] font-display text-[34px] font-semibold tracking-[-0.035em] text-ink sm:text-[42px] sm:leading-[1.06] lg:text-[52px]">
                <Trans i18nKey="home.title" components={{ 0: <span className="text-accent" /> }} />
              </h1>
              <p className="mx-auto mt-4 max-w-[620px] text-[16px] leading-7 text-ink-muted sm:text-[18px]">
                {t('home.subtitle')}
              </p>

              <div className="mx-auto mt-8 max-w-[900px]">
                <UrlInputForm />
              </div>

              <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-6 text-ink-faint sm:text-[15px]">
                {t('home.helper')}
              </p>

              <Link
                to="/feed"
                className="mx-auto mt-5 inline-flex items-center gap-inline-xs text-[14px] font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                {t('home.feedCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ContentTransition>
        </div>
      </section>

      <section className="border-t border-border/50 px-inset-lg pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-18">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-8 flex flex-col gap-stack-md sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.feedPreviewEyebrow')}
              </p>
              <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.03em] text-ink sm:text-[30px]">
                {t('home.feedPreviewTitle')}
              </h2>
              <p className="mt-3 max-w-[560px] text-[15px] leading-6 text-ink-muted sm:text-[16px]">
                {t('home.feedPreviewSubtitle')}
              </p>
            </div>

            <Link
              to="/feed"
              className="inline-flex h-[var(--button-height-md)] shrink-0 items-center justify-center gap-inline-xs rounded-full border border-border bg-[var(--color-bg-card)] px-inset-lg text-[length:var(--button-font-size-md)] font-semibold text-ink no-underline transition-colors hover:bg-surface"
            >
              {t('home.feedPreviewMore')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ContentTransition transitionKey={isFeedPreviewLoading ? 'feed-preview-loading' : feedPreviewItems.map((item) => item.id).join(',')}>
            {isFeedPreviewLoading ? (
              <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg text-sm text-[var(--color-text-secondary)]">
                {t('home.feedPreviewLoading')}
              </div>
            ) : feedPreviewItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-inline-lg md:grid-cols-2 lg:grid-cols-3">
                {feedPreviewItems.map((item) => (
                  <FeedCard
                    key={item.id}
                    item={item}
                    to={`/result?analysisId=${encodeURIComponent(item.analysis.id)}`}
                    layout="stacked"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg text-sm text-[var(--color-text-secondary)]">
                {t('home.feedPreviewEmpty')}
              </div>
            )}
          </ContentTransition>
        </div>
      </section>

      <section className="border-t border-border/50 px-inset-lg pb-24 pt-14 sm:px-8 sm:pb-28 sm:pt-18">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[920px]">
            <div className="mb-8 sm:mb-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.exampleSectionEyebrow')}
              </p>
              <h2 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.03em] text-ink sm:text-[30px]">
                {t('home.exampleSectionTitle')}
              </h2>
              <p className="mt-3 max-w-[520px] text-[15px] leading-6 text-ink-muted sm:text-[16px]">
                {t('home.exampleSectionSubtitle')}
              </p>
            </div>

            <div aria-live="polite">
              <ContentTransition transitionKey={exampleTransitionKey}>
                <ExampleAnalysisState
                  item={featuredItem}
                  isPending={isExamplePending}
                  isError={isExampleError}
                  onRetry={() => void refetchExample()}
                />
              </ContentTransition>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
