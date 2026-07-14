import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '../../shared/i18n';
import FeedbackForm from './FeedbackForm';
import { ApiRequestError } from '../../shared/api/httpClient';

const postFeedbackMock = vi.fn();

vi.mock('./api/feedbackApi', async () => {
  const actual = await vi.importActual<typeof import('./api/feedbackApi')>('./api/feedbackApi');
  return {
    ...actual,
    postFeedback: (...args: unknown[]) => postFeedbackMock(...args),
  };
});

describe('FeedbackForm', () => {
  beforeEach(() => {
    postFeedbackMock.mockReset();
    localStorage.setItem('youtive_lang', 'en');
  });

  it('shows a validation error when submitting without a rating', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);

    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    expect(screen.getByText('Please select a rating')).toBeInTheDocument();
    expect(postFeedbackMock).not.toHaveBeenCalled();
  });

  it('submits with a selected rating and optional analysisId', async () => {
    postFeedbackMock.mockResolvedValueOnce({
      feedbackId: 'fb_1',
      status: 'RECEIVED',
      message: 'ขอบคุณสำหรับความคิดเห็น',
    });
    const user = userEvent.setup();
    render(<FeedbackForm analysisId="analysis-123" />);

    await user.click(screen.getByRole('radio', { name: 'Very helpful' }));
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(postFeedbackMock).toHaveBeenCalledWith({
        analysisId: 'analysis-123',
        rating: 'VERY_HELPFUL',
        comment: '',
        reasons: [],
      });
    });

    expect(await screen.findByText('ขอบคุณสำหรับความคิดเห็น')).toBeInTheDocument();
  });

  it('submits without an analysisId when not provided', async () => {
    postFeedbackMock.mockResolvedValueOnce({
      feedbackId: 'fb_2',
      status: 'RECEIVED',
      message: 'ขอบคุณสำหรับความคิดเห็น',
    });
    const user = userEvent.setup();
    render(<FeedbackForm />);

    await user.click(screen.getByRole('radio', { name: 'Okay' }));
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    await waitFor(() => {
      expect(postFeedbackMock).toHaveBeenCalledWith(
        expect.objectContaining({ analysisId: undefined, rating: 'OKAY' }),
      );
    });
  });

  it('shows a specific message when the analysis is not found', async () => {
    postFeedbackMock.mockRejectedValueOnce(
      new ApiRequestError('API request failed: 404', 404, {
        data: { code: 'ANALYSIS_NOT_FOUND' },
      }),
    );
    const user = userEvent.setup();
    render(<FeedbackForm analysisId="missing-id" />);

    await user.click(screen.getByRole('radio', { name: 'Helpful' }));
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    expect(await screen.findByText('This analysis could not be found, but you can still send general feedback.')).toBeInTheDocument();
  });

  it('falls back to the server message when there is no error code', async () => {
    postFeedbackMock.mockRejectedValueOnce(
      new ApiRequestError('API request failed: 400', 400, {
        data: { message: ['rating must be one of the following values: NOT_HELPFUL, SLIGHTLY_HELPFUL, OKAY, HELPFUL, VERY_HELPFUL'] },
      }),
    );
    const user = userEvent.setup();
    render(<FeedbackForm />);

    await user.click(screen.getByRole('radio', { name: 'Okay' }));
    await user.click(screen.getByRole('button', { name: /send feedback/i }));

    expect(await screen.findByText(/rating must be one of the following values/i)).toBeInTheDocument();
  });

  it('enforces the 500 character limit on the comment field', () => {
    render(<FeedbackForm />);

    const textarea = screen.getByPlaceholderText('Tell us more...');
    expect(textarea).toHaveAttribute('maxLength', '500');
  });

  it('hides the built-in title/subtitle when hideHeader is set', () => {
    render(<FeedbackForm hideHeader />);

    expect(screen.queryByText('Was this helpful?')).not.toBeInTheDocument();
    expect(screen.queryByText('Your feedback helps us make the summaries better.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send feedback/i })).toBeInTheDocument();
  });
});
