import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';

type StaticPageKey = 'about' | 'contact' | 'help' | 'privacy' | 'terms';

interface StaticPageProps {
  pageKey: StaticPageKey;
}

export default function StaticPage({ pageKey }: StaticPageProps) {
  const { t } = useTranslation();
  const items = t(`static.${pageKey}.items`, { returnObjects: true }) as string[];

  return (
    <main className="min-h-[calc(100vh-var(--app-header-height))] bg-white px-inset-lg py-stack-xl sm:px-8 sm:py-stack-2xl">
      <section className="mx-auto w-full max-w-read">
        <Text variant="label" color="tertiary" as="p" className="mb-stack-sm">
          {t(`static.${pageKey}.eyebrow`)}
        </Text>
        <Text variant="display" as="h1" className="mb-stack-md font-display">
          {t(`static.${pageKey}.title`)}
        </Text>
        <Text variant="body" color="secondary" as="p" className="mb-stack-lg leading-7">
          {t(`static.${pageKey}.body`)}
        </Text>

        <div className="space-y-stack-md border-t border-border/60 pt-stack-lg">
          {items.map((item) => (
            <p key={item} className="text-[length:var(--text-body-size)] leading-7 text-[var(--color-text-primary)]">
              {item}
            </p>
          ))}
        </div>

        <Link
          to="/"
          className="mt-stack-xl inline-flex text-[length:var(--text-caption-size)] font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
        >
          {t('static.backHome')}
        </Link>
      </section>
    </main>
  );
}
