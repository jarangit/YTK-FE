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
      <section className="px-inset-lg pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1120px]">
          <ContentTransition transitionKey="home-hero">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.eyebrow')}
              </p>
              <h1 className="mt-6 font-display text-[48px] font-semibold tracking-[-0.04em] text-ink sm:text-[64px] sm:leading-[1.02] lg:text-[82px]">
                {t('home.titleLine1')}
                <br />
                {t('home.titleLine2')}
              </h1>
              <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-8 text-ink-muted sm:text-[21px]">
                {t('home.subtitleLine1')}
                <br />
                {t('home.subtitleLine2')}
              </p>

              <div className="mx-auto mt-10 max-w-[860px]">
                <UrlInputForm />
              </div>

              <Link
                to="/feed"
                className="mx-auto mt-6 inline-flex items-center gap-inline-xs text-[15px] font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
              >
                {t('home.feedCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ContentTransition>
        </div>
      </section>

      <section className="px-inset-lg pb-24 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[920px]">
            <div className="mb-10 sm:mb-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.exampleSectionEyebrow')}
              </p>
              <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.03em] text-ink sm:text-[42px]">
                {t('home.exampleSectionTitle')}
              </h2>
              <p className="mt-4 max-w-[560px] text-[17px] leading-7 text-ink-muted">
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
