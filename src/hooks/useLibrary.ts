import { useState, useCallback, useEffect } from 'react';
import { getKeptItems, saveKeptItem, removeKeptItem, isKept } from '../utils/storage';
import type { MockVideo, KeptItem } from '../types';

export function useLibrary() {
  const [items, setItems] = useState<KeptItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(getKeptItems());
    setHydrated(true);
  }, []);

  const add = useCallback((video: MockVideo) => {
    saveKeptItem(video);
    setItems(getKeptItems());
  }, []);

  const remove = useCallback((videoId: string) => {
    removeKeptItem(videoId);
    setItems(getKeptItems());
  }, []);

  const check = useCallback((videoId: string) => {
    return isKept(videoId);
  }, []);

  return { items, hydrated, add, remove, check };
}
