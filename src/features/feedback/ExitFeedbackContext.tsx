import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getExitFeedbackState, setExitFeedbackState } from './exitFeedbackStorage';

interface ExitFeedbackContextValue {
  activeAnalysisId: string | null;
  isModalOpen: boolean;
  registerResultAnalysis: (analysisId: string) => void;
  unregisterResultAnalysis: () => void;
  guardLinkClick: (event: React.MouseEvent, to: string) => void;
  markFeedbackGiven: () => void;
  skipFeedback: () => void;
}

const ExitFeedbackContext = createContext<ExitFeedbackContextValue | null>(null);

export function ExitFeedbackProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<string | null>(null);

  const registerResultAnalysis = useCallback((analysisId: string) => {
    setActiveAnalysisId(analysisId);
  }, []);

  const unregisterResultAnalysis = useCallback(() => {
    setActiveAnalysisId(null);
    setIsModalOpen(false);
    setPendingTarget(null);
  }, []);

  const guardLinkClick = useCallback((event: React.MouseEvent, to: string) => {
    if (!activeAnalysisId) return;
    if (getExitFeedbackState(activeAnalysisId)) return;

    event.preventDefault();
    setPendingTarget(to);
    setIsModalOpen(true);
  }, [activeAnalysisId]);

  const resolveExit = useCallback((state: 'given' | 'dismissed') => {
    if (activeAnalysisId) {
      setExitFeedbackState(activeAnalysisId, state);
    }

    setIsModalOpen(false);

    if (pendingTarget) {
      navigate(pendingTarget);
    }

    setPendingTarget(null);
  }, [activeAnalysisId, navigate, pendingTarget]);

  const markFeedbackGiven = useCallback(() => resolveExit('given'), [resolveExit]);
  const skipFeedback = useCallback(() => resolveExit('dismissed'), [resolveExit]);

  const value = useMemo<ExitFeedbackContextValue>(
    () => ({
      activeAnalysisId,
      isModalOpen,
      registerResultAnalysis,
      unregisterResultAnalysis,
      guardLinkClick,
      markFeedbackGiven,
      skipFeedback,
    }),
    [
      activeAnalysisId,
      guardLinkClick,
      isModalOpen,
      markFeedbackGiven,
      registerResultAnalysis,
      skipFeedback,
      unregisterResultAnalysis,
    ],
  );

  return <ExitFeedbackContext.Provider value={value}>{children}</ExitFeedbackContext.Provider>;
}

export function useExitFeedbackGuard() {
  const context = useContext(ExitFeedbackContext);

  if (!context) {
    throw new Error('useExitFeedbackGuard must be used within an ExitFeedbackProvider');
  }

  return context;
}
