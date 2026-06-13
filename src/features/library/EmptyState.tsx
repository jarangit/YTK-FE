import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import IconButton from '../../shared/components/atoms/IconButton';
import StateBlock from '../../shared/components/molecules/StateBlock';

interface Props {
  message?: string;
}

export default function EmptyState({ message }: Props) {
  const { t } = useTranslation();

  return (
    <StateBlock
      icon={Bookmark}
      title={message ?? t('empty.title')}
      description={t('empty.subtitle')}
      action={(
        <Link to="/" className="no-underline">
          <IconButton
            icon={Bookmark}
            ariaLabel={t('empty.action')}
            variant="filled"
            size="md"
          />
        </Link>
      )}
    />
  );
}
