import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoAnalysis } from './types';
import { useAuth } from '../../shared/auth/AuthContext';
import { Button } from '../../shared/components/atoms/Button';
import Card from '../../shared/components/atoms/Card';
import Toast from '../../shared/components/molecules/Toast';

interface Props {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
  initiallyKept?: boolean;
}

export default function KeepButton({ video, onKeep, onRemove, initiallyKept }: Props) {
  const { t } = useTranslation();
  const { isAuthenticated, openSignInModal } = useAuth();
  const [kept, setKept] = useState(initiallyKept ?? false);
  const [toast, setToast] = useState(false);
  const [signInToast, setSignInToast] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      openSignInModal();
      setSignInToast(true);
      setTimeout(() => setSignInToast(false), 2500);
      return;
    }

    if (kept) {
      onRemove(video.id);
      setKept(false);
    } else {
      onKeep(video);
      setKept(true);
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  return (
    <>
      <Card padded className="bg-white">
        <h2 className="font-display font-semibold text-lg text-ink mb-stack-xs">
          {t('keep.title')}
        </h2>
        <p className="text-sm text-ink-muted mb-stack-md">
          {t('keep.desc')}
        </p>
        <Button
          type="button"
          onClick={handleClick}
          variant={kept ? 'secondary' : 'primary'}
          iconLeft={Bookmark}
          className={kept
            ? 'reduce-motion-transitions scale-[1.02] border-accent/20 bg-accent-light text-accent transition-transform duration-[var(--motion-duration-fast)] hover:bg-accent-light'
            : 'reduce-motion-transitions scale-100 transition-transform duration-[var(--motion-duration-fast)]'}
        >
          {kept ? t('keep.kept') : t('keep.button')}
        </Button>
      </Card>

      <Toast visible={toast}>{t('keep.toast')}</Toast>

      <Toast visible={signInToast}>{t('auth.keepRequiresSignIn')}</Toast>
    </>
  );
}
