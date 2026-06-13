import { ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { MockVideo } from '../../shared/types';

interface ExampleAnalysisCardProps {
  video: MockVideo;
}

export default function ExampleAnalysisCard({ video }: ExampleAnalysisCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <article className="overflow-hidden rounded-[32px] border border-border/60 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <div className="relative bg-surface p-4 sm:p-5 lg:p-6">
          <div className="overflow-hidden rounded-[24px] bg-white">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-6">
            <div className="max-w-[560px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.exampleLabel')}
              </p>
              <h3 className="mt-3 font-display text-[24px] font-semibold leading-[1.15] text-ink sm:text-[28px]">
                {video.title}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-muted">{video.channelName}</p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-muted">
              <Clock className="h-4 w-4" />
              {video.duration}
            </div>
          </div>

          <div className="grid gap-8 pt-6 lg:grid-cols-[1fr_280px]">
            <div>
              <h4 className="text-[19px] font-semibold leading-[1.35] text-ink sm:text-[22px]">
                {t('home.exampleOutcomeTitle')}
              </h4>
              <ul className="mt-5 space-y-3">
                {video.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-[17px] leading-7 text-ink">
                    <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] bg-surface p-5 sm:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.summaryLabel')}
              </p>
              <p className="mt-3 text-[17px] font-semibold leading-7 text-ink">
                {t('home.summaryCta')}
              </p>
              <p className="mt-3 text-[15px] leading-6 text-ink-muted">
                {video.summary.bigIdea}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/result?url=${encodeURIComponent(video.videoUrl)}`)}
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {t('home.readPreview')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
