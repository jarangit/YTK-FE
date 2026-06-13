import { useTranslation } from 'react-i18next';
import UrlInputForm from './UrlInputForm';
import ExampleAnalysisCard from './ExampleAnalysisCard';
import { mockVideos } from '../result/data/mockVideos';

export default function HomePage() {
  const { t } = useTranslation();
  const exampleVideo = mockVideos[0];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white">
      <section className="px-inset-lg pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1120px]">
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
          </div>
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

            <ExampleAnalysisCard video={exampleVideo} />
          </div>
        </div>
      </section>
    </main>
  );
}
