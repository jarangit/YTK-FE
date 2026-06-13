import { useTranslation } from 'react-i18next';
import { LinkButton } from '../../shared/components/atoms/Button';
import PageHeader from '../../shared/components/organisms/PageHeader';
import PageLayout from '../../shared/components/organisms/PageLayout';

type StaticPageKey = 'about' | 'contact' | 'help' | 'privacy' | 'terms';

interface StaticPageProps {
  pageKey: StaticPageKey;
}

export default function StaticPage({ pageKey }: StaticPageProps) {
  const { t } = useTranslation();
  const items = t(`static.${pageKey}.items`, { returnObjects: true }) as string[];

  return (
    <PageLayout width="read">
      <PageHeader
        eyebrow={t(`static.${pageKey}.eyebrow`)}
        title={t(`static.${pageKey}.title`)}
        subtitle={t(`static.${pageKey}.body`)}
        className="mb-stack-lg"
      />

        <div className="space-y-stack-md border-t border-border/60 pt-stack-lg">
          {items.map((item) => (
            <p key={item} className="text-[length:var(--text-body-size)] leading-7 text-[var(--color-text-primary)]">
              {item}
            </p>
          ))}
        </div>

        <LinkButton
          to="/"
          variant="link"
          className="mt-stack-xl"
        >
          {t('static.backHome')}
        </LinkButton>
    </PageLayout>
  );
}
