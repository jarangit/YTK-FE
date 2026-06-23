import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import LibraryCard from './LibraryCard';
import { useLibraryQuery } from './hooks/useLibraryQuery';
import { useHistoryQuery } from '../history/hooks/useHistoryQuery';
import AppShell from '../../app/layout/AppShell';
import CollectionSidebar from './CollectionSidebar';
import CollectionGridSkeleton from './CollectionGridSkeleton';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
import ContentTransition from '../../shared/components/atoms/ContentTransition';

export default function LibraryPage() {
  const { t } = useTranslation();
  const { items, hydrated, remove } = useLibraryQuery();
  const { items: historyItems, hydrated: historyHydrated } = useHistoryQuery();
  const navigate = useNavigate();

  return (
    <AppShell
      sidebar={
        <CollectionSidebar
          activePath="/library"
          libraryCount={hydrated ? items.length : undefined}
          historyCount={historyHydrated ? historyItems.length : undefined}
          onNavigate={(path) => navigate(path)}
        />
      }
    >
      <div>
        <header className="mb-stack-lg max-w-read">
          <div className="mb-stack-sm flex items-center gap-inline-md">
            <Text variant="display" as="h1">
              {t('library.title')}
            </Text>
            {hydrated && items.length > 0 && (
              <Badge variant="accent">{t('library.count', { count: items.length })}</Badge>
            )}
          </div>
          <Text variant="body" color="secondary">
            {t('library.subtitle')}
          </Text>
        </header>

        <ContentTransition transitionKey={!hydrated ? 'loading' : items.length === 0 ? 'empty' : 'content'}>
          {!hydrated ? (
            <CollectionGridSkeleton label={t('library.loading')} />
          ) : items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <LibraryCard
                  key={item.id}
                  item={item}
                  onRemove={remove}
                />
              ))}
            </div>
          )}
        </ContentTransition>
      </div>
    </AppShell>
  );
}
