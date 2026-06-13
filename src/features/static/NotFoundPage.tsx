import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="grid min-h-[calc(100vh-var(--app-header-height))] place-items-center bg-white px-inset-lg py-stack-2xl sm:px-8">
      <section className="w-full max-w-read text-center">
        <Text variant="label" color="tertiary" as="p" className="mb-stack-sm">
          {t('notFound.eyebrow')}
        </Text>
        <Text variant="display" as="h1" className="mb-stack-md font-display">
          {t('notFound.title')}
        </Text>
        <Text variant="body" color="secondary" as="p" className="mx-auto max-w-[520px] leading-7">
          {t('notFound.subtitle')}
        </Text>
        <Link
          to="/"
          className="mt-stack-lg inline-flex h-[var(--app-header-control-height)] items-center rounded-full bg-[var(--color-text-primary)] px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-semibold text-white no-underline transition-colors hover:bg-[var(--color-gray-800)]"
        >
          {t('static.backHome')}
        </Link>
      </section>
    </main>
  );
}
