import { useNavigate } from 'react-router-dom';
import { Home, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import FeedCard from '../feed/FeedCard';
import { useLibrary } from '../../shared/hooks/useLibrary';
import { keptItemToFeedItem } from '../../shared/utils/storage';
import AppShell from '../../shared/components/organisms/AppShell';
import AppSidebar from '../../shared/components/organisms/AppSidebar';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';

export default function LibraryPage() {
  const { t } = useTranslation();
  const { items, hydrated, remove } = useLibrary();
  const navigate = useNavigate();

  const sidebarSections = [
    {
      items: [
        { icon: Home, label: t('nav.home'), path: '/' },
      ],
    },
    {
      label: t('sidebar.library'),
      items: [
        { icon: Bookmark, label: t('nav.library'), path: '/library', count: hydrated ? items.length : undefined },
      ],
    },
  ];

  return (
    <AppShell
      sidebar={
        <AppSidebar
          sections={sidebarSections}
          activePath="/library"
          onNavigate={(path) => navigate(path)}
        />
      }
    >
      <div className="w-full">
        <div className="max-w-[720px]">
          <div className="flex items-center gap-inline-md mb-stack-sm">
            <Text variant="display" as="h1">
              {t('library.title')}
            </Text>
            {hydrated && items.length > 0 && (
              <Badge variant="accent">{t('library.count', { count: items.length })}</Badge>
            )}
          </div>
          <Text variant="body" color="secondary" className="mb-stack-lg">
            {t('library.subtitle')}
          </Text>
        </div>

        {!hydrated ? null : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-inline-lg">
            {items.map((item) => (
              <FeedCard
                key={item.video.id + item.keptAt}
                item={keptItemToFeedItem(item)}
                to={`/result?url=${encodeURIComponent(item.video.videoUrl)}`}
                onRemove={remove}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
