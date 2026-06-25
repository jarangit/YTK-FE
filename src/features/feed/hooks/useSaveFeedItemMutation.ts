import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveFeedItem } from '../api/feedApi';
import { feedKeys } from './useFeedQuery';
import { libraryKeys } from '../../library/hooks/useLibraryQuery';
import { useAuth } from '../../../shared/auth/AuthContext';

export function useSaveFeedItemMutation() {
  const { isAuthenticated, openSignInModal, user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => saveFeedItem(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });

      if (user?.id) {
        void queryClient.invalidateQueries({ queryKey: libraryKeys.list(user.id) });
      }
    },
  });

  const save = useCallback((id: string) => {
    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    mutation.mutate(id);
  }, [isAuthenticated, mutation, openSignInModal]);

  return {
    ...mutation,
    save,
  };
}
