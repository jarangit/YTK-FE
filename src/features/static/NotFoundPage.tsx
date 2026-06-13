import { useTranslation } from 'react-i18next';
import { LinkButton } from '../../shared/components/atoms/Button';
import PageHeader from '../../shared/components/organisms/PageHeader';
import PageLayout from '../../shared/components/organisms/PageLayout';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageLayout width="read" centered>
      <div className="text-center">
        <PageHeader
          eyebrow={t('notFound.eyebrow')}
          title={t('notFound.title')}
          subtitle={t('notFound.subtitle')}
          centered
        />
        <LinkButton to="/" variant="primary" className="mt-stack-lg bg-[var(--color-text-primary)] hover:bg-[var(--color-gray-800)]">
          {t('static.backHome')}
        </LinkButton>
      </div>
    </PageLayout>
  );
}
