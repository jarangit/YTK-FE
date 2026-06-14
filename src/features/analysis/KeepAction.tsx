import { useEffect, useRef, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoAnalysis } from './types';
import { useAuth } from '../../shared/auth/AuthContext';
import { Button } from '../../shared/components/atoms/Button';
import Toast from '../../shared/components/molecules/Toast';

interface KeepActionProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
  initiallyKept?: boolean;
  className?: string;
}

export default function KeepAction({
  video,
  onKeep,
  onRemove,
  initiallyKept,
  className,
}: KeepActionProps) {
  const { t } = useTranslation();
  const { isAuthenticated, openSignInModal } = useAuth();
  const [kept, setKept] = useState(initiallyKept ?? false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2500);
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      openSignInModal();
      showToast(t('auth.keepRequiresSignIn'));
      return;
    }

    if (kept) {
      onRemove(video.id);
      setKept(false);
      return;
    }

    onKeep(video);
    setKept(true);
    showToast(t('keep.toast'));
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        variant={kept ? 'secondary' : 'primary'}
        iconLeft={Bookmark}
        className={kept
          ? `reduce-motion-transitions border-accent/20 bg-accent-light text-accent transition-transform duration-[var(--motion-duration-fast)] hover:bg-accent-light ${className ?? ''}`
          : className}
      >
        {kept ? t('keep.kept') : t('keep.button')}
      </Button>

      <Toast visible={Boolean(toastMessage)}>{toastMessage}</Toast>
    </>
  );
}
