import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import UrlInputForm from './UrlInputForm';
import ExampleAnalysisState from './ExampleAnalysisState';
import { useExampleAnalysisQuery } from './hooks/useExampleAnalysisQuery';

export default function HomePage() {
  const { t } = useTranslation();
  const {
    data: exampleVideo,
    isPending: isExamplePending,
    isError: isExampleError,
    refetch: refetchExample,
  } = useExampleAnalysisQuery();
  const exampleTransitionKey = isExamplePending ? 'loading' : isExampleError ? 'error' : 'success';

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white">
      <section className="px-inset-lg pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-[1120px]">
          <ContentTransition transitionKey="home-hero">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mx-auto max-w-[760px] font-display text-[34px] font-semibold tracking-[-0.035em] text-ink sm:text-[42px] sm:leading-[1.06] lg:text-[52px]">
                {t('home.title')}
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
                  video={exampleVideo}
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
