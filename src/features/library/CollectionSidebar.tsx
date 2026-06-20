import { Bookmark, History, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AppSidebar from '../../app/layout/AppSidebar';

interface CollectionSidebarProps {
  activePath: '/library' | '/history';
  libraryCount?: number;
  historyCount?: number;
  onNavigate: (path: string) => void;
}

export default function CollectionSidebar({
  activePath,
  libraryCount,
  historyCount,
  onNavigate,
}: CollectionSidebarProps) {
  const { t } = useTranslation();

  return (
    <AppSidebar
      activePath={activePath}
      onNavigate={onNavigate}
      sections={[
        { items: [{ icon: Home, label: t('nav.home'), path: '/' }] },
        {
          label: t('sidebar.library'),
          items: [
            { icon: Bookmark, label: t('nav.library'), path: '/library', count: libraryCount },
            { icon: History, label: t('nav.history'), path: '/history', count: historyCount },
          ],
        },
      ]}
    />
  );
}
