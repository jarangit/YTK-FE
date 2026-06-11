import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Bookmark, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import UrlInputForm from './UrlInputForm';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const examples = [
    { label: 'English Speaking Practice', url: 'https://youtube.com/watch?v=english-speaking-practice' },
    { label: 'Product Management Talk', url: 'https://youtube.com/watch?v=product-discovery' },
    { label: 'React Tutorial', url: 'https://youtube.com/watch?v=react-state-management' },
  ];

  const steps = [
    { icon: Search, title: t('home.step1Title'), desc: t('home.step1Desc') },
    { icon: ArrowRight, title: t('home.step2Title'), desc: t('home.step2Desc') },
    { icon: Bookmark, title: t('home.step3Title'), desc: t('home.step3Desc') },
  ];

  return (
    <main className="min-h-[calc(100vh-56px)] flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-5 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="w-full max-w-[600px] text-center">
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1] mb-3"
            dangerouslySetInnerHTML={{ __html: t('home.title') }}
          />
          <p className="text-base sm:text-lg text-ink-muted max-w-[460px] mx-auto mb-8 leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="mb-6">
            <UrlInputForm />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() =>
                  navigate(`/result?url=${encodeURIComponent(ex.url)}`)
                }
                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white border border-border rounded-full text-xs font-medium text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
              >
                {ex.label}
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[680px] mx-auto px-5 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-sm text-ink mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
