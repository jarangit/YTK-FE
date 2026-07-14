export type ExitFeedbackState = 'given' | 'dismissed';

function getStorageKey(analysisId: string) {
  return `youtive_exit_feedback_${analysisId}`;
}

export function getExitFeedbackState(analysisId: string): ExitFeedbackState | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  const storedValue = sessionStorage.getItem(getStorageKey(analysisId));
  return storedValue === 'given' || storedValue === 'dismissed' ? storedValue : null;
}

export function setExitFeedbackState(analysisId: string, state: ExitFeedbackState) {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  sessionStorage.setItem(getStorageKey(analysisId), state);
}
