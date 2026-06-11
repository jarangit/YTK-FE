import { useNavigate } from 'react-router-dom';
import { Home, Bookmark } from 'lucide-react';
import LibraryCard from '../components/LibraryCard';
import EmptyState from '../components/EmptyState';
import { useLibrary } from '../hooks/useLibrary';
import AppShell from '../components/organisms/AppShell';
import AppSidebar from '../components/organisms/AppSidebar';
import Text from '../components/atoms/Text';
import Badge from '../components/atoms/Badge';

export default function LibraryPage() {
  const { items, hydrated, remove } = useLibrary();
  const navigate = useNavigate();

  const sidebarSections = [
    {
      items: [
        { icon: Home, label: 'Home', path: '/' },
      ],
    },
    {
      label: 'Library',
      items: [
        { icon: Bookmark, label: 'Saved', path: '/library', count: hydrated ? items.length : undefined },
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
      <div className="flex items-center gap-3 mb-1">
        <Text variant="display" as="h1">
          Your kept videos
        </Text>
        {hydrated && items.length > 0 && (
          <Badge variant="accent">{items.length} saved</Badge>
        )}
      </div>
      <Text variant="body" color="secondary" className="mb-6 sm:mb-8">
        Saved for later, ready when you are.
      </Text>

      {!hydrated ? null : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4" style={{ maxWidth: 720 }}>
          {items.map((item) => (
            <LibraryCard
              key={item.video.id + item.keptAt}
              item={item}
              onRemove={remove}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
