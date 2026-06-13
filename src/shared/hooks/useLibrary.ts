import { useState, useCallback, useEffect } from 'react';
import { getKeptItems, saveKeptItem, removeKeptItem, isKept } from '../utils/storage';
import type { MockVideo, KeptItem } from '../types';
import { useAuth } from '../auth/AuthContext';

export function useLibrary() {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<KeptItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setItems([]);
      setHydrated(true);
      return;
    }

    setItems(getKeptItems(user.id));
    setHydrated(true);
  }, [isAuthenticated, user]);

  const add = useCallback((video: MockVideo) => {
    if (!user) return;
    saveKeptItem(video, user.id);
    setItems(getKeptItems(user.id));
  }, [user]);

  const remove = useCallback((videoId: string) => {
    if (!user) return;
    removeKeptItem(videoId, user.id);
    setItems(getKeptItems(user.id));
  }, [user]);

  const check = useCallback((videoId: string) => {
    if (!user) return false;
    return isKept(videoId, user.id);
  }, [user]);

  return { items, hydrated, add, remove, check };
}
