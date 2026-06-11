import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';
import IconButton from '../../shared/components/atoms/IconButton';

interface Props {
  message?: string;
}

export default function EmptyState({ message }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-accent-light)' }}
      >
        <Bookmark className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
      </div>
      <Text variant="title" as="p" className="mb-2">
        {message ?? t('empty.title')}
      </Text>
      <Text variant="body" color="secondary" className="mb-6">
        {t('empty.subtitle')}
      </Text>
      <Link to="/" className="no-underline">
        <IconButton
          icon={Bookmark}
          ariaLabel={t('empty.action')}
          variant="filled"
          size="md"
        />
      </Link>
    </div>
  );
}
