import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Bookmark, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
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
      <section className="flex-1 flex flex-col items-center justify-center px-inset-lg pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="w-full max-w-[600px] text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1]">
            {t('home.titleLine1')}
            <br />
            {t('home.titleLine2')}
          </h1>
          <Text
            as="p"
            variant="body"
            color="secondary"
            className="max-w-[460px] mx-auto mt-stack-sm mb-stack-lg"
          >
            {t('home.subtitle')}
          </Text>

          <div className="mb-stack-md">
            <UrlInputForm />
          </div>

          <div className="flex flex-wrap justify-center gap-inline-sm">
            {examples.map((ex) => (
              <Badge
                key={ex.label}
                as="button"
                variant="accent"
                onClick={() =>
                  navigate(`/result?url=${encodeURIComponent(ex.url)}`)
                }
              >
                {ex.label}
                <ChevronRight className="w-3 h-3" />
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[600px] mx-auto px-inset-lg pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-inline-xl">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-stack-sm">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <Text variant="title" color="primary" className="mb-stack-xs">
                  {step.title}
                </Text>
                <Text variant="caption" color="secondary">
                  {step.desc}
                </Text>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
