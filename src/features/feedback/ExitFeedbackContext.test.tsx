import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useEffect } from 'react';
import { MemoryRouter, Link, Routes, Route, useLocation } from 'react-router-dom';
import '../../shared/i18n';
import { ExitFeedbackProvider, useExitFeedbackGuard } from './ExitFeedbackContext';
import ExitFeedbackModal from './ExitFeedbackModal';

const postFeedbackMock = vi.fn();

vi.mock('./api/feedbackApi', async () => {
  const actual = await vi.importActual<typeof import('./api/feedbackApi')>('./api/feedbackApi');
  return {
    ...actual,
    postFeedback: (...args: unknown[]) => postFeedbackMock(...args),
  };
});

function CurrentPath() {
  const location = useLocation();
  return <p data-testid="current-path">{location.pathname}</p>;
}

function ResultStub({ analysisId }: { analysisId: string }) {
  const { registerResultAnalysis, unregisterResultAnalysis, guardLinkClick } = useExitFeedbackGuard();

  useEffect(() => {
    registerResultAnalysis(analysisId);
    return unregisterResultAnalysis;
  }, [analysisId, registerResultAnalysis, unregisterResultAnalysis]);

  return (
    <div>
      <Link to="/feed" onClick={(event) => guardLinkClick(event, '/feed')}>
        Go to feed
      </Link>
      <button type="button" onClick={unregisterResultAnalysis}>
        Unregister
      </button>
    </div>
  );
}

function Harness({ analysisId }: { analysisId: string }) {
  return (
    <MemoryRouter initialEntries={['/result']}>
      <ExitFeedbackProvider>
        <CurrentPath />
        <Routes>
          <Route path="/result" element={<ResultStub analysisId={analysisId} />} />
          <Route path="/feed" element={<p>Feed page</p>} />
        </Routes>
        <ExitFeedbackModal />
      </ExitFeedbackProvider>
    </MemoryRouter>
  );
}

describe('Exit feedback guard', () => {
  beforeEach(() => {
    postFeedbackMock.mockReset();
    sessionStorage.clear();
    localStorage.setItem('youtive_lang', 'en');
  });

  it('opens the exit modal instead of navigating when a guarded link is clicked', async () => {
    const user = userEvent.setup();
    render(<Harness analysisId="analysis-exit-1" />);

    await user.click(screen.getByRole('link', { name: 'Go to feed' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('current-path')).toHaveTextContent('/result');
  });

  it('submits feedback in the modal and then completes the pending navigation', async () => {
    postFeedbackMock.mockResolvedValueOnce({
      feedbackId: 'fb_exit_1',
      status: 'RECEIVED',
      message: 'Thanks',
    });
    const user = userEvent.setup();
    render(<Harness analysisId="analysis-exit-2" />);

    await user.click(screen.getByRole('link', { name: 'Go to feed' }));
    await user.click(screen.getByRole('radio', { name: 'Very helpful' }));
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(postFeedbackMock).toHaveBeenCalledWith(
        expect.objectContaining({ analysisId: 'analysis-exit-2', rating: 'VERY_HELPFUL' }),
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/feed');
    });
  });

  it('skips feedback and still completes the pending navigation', async () => {
    const user = userEvent.setup();
    render(<Harness analysisId="analysis-exit-3" />);

    await user.click(screen.getByRole('link', { name: 'Go to feed' }));
    await user.click(screen.getByRole('button', { name: /leave without feedback/i }));

    expect(postFeedbackMock).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/feed');
    });
  });

  it('does not ask again in the same session after the user already skipped', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Harness analysisId="analysis-exit-4" />);

    await user.click(screen.getByRole('link', { name: 'Go to feed' }));
    await user.click(screen.getByRole('button', { name: /leave without feedback/i }));
    unmount();

    render(<Harness analysisId="analysis-exit-4" />);
    await user.click(screen.getByRole('link', { name: 'Go to feed' }));

    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/feed');
    });
    expect(screen.queryByRole('dialog', { hidden: false })).toBeNull();
  });
});
