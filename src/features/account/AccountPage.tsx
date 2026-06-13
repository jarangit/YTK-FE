import { useTranslation } from 'react-i18next';
import { useAuth } from '../../shared/auth/AuthContext';
import Avatar from '../../shared/components/atoms/Avatar';
import { Button } from '../../shared/components/atoms/Button';
import Card from '../../shared/components/atoms/Card';
import PageHeader from '../../shared/components/organisms/PageHeader';
import PageLayout from '../../shared/components/organisms/PageLayout';

export default function AccountPage() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <PageLayout width="read">
      <PageHeader
        eyebrow={t('account.eyebrow')}
        title={t('account.title')}
        subtitle={t('account.subtitle')}
        className="mb-stack-lg"
      />

        <Card padded as="div" className="bg-surface">
          <div className="flex items-center gap-inline-md">
            <Avatar src={user?.avatarUrl} alt={user?.name} fallback={user?.name} />
            <div>
              <p className="text-[length:var(--text-body-size)] font-semibold text-[var(--color-text-primary)]">
                {user?.name}
              </p>
              <p className="mt-stack-xs text-[length:var(--text-caption-size)] text-[var(--color-text-secondary)]">
                {user?.email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={signOut}
            variant="secondary"
            className="mt-stack-lg"
          >
            {t('auth.signOut')}
          </Button>
        </Card>
    </PageLayout>
  );
}
