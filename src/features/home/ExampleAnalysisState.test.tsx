import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '../../shared/i18n';
import ExampleAnalysisState from './ExampleAnalysisState';
import { toHomeFeaturedAnalysis } from './homeFeaturedAnalysis';
import { analyticsMock } from './data/analytics.mock';

const item = toHomeFeaturedAnalysis(analyticsMock[0])!;
const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('ExampleAnalysisState', () => {
  beforeAll(() => {
    localStorage.setItem('youtive_lang', 'en');
  });

  it('renders title, summary, rank, and view count in success state', () => {
    render(
      <MemoryRouter>
        <ExampleAnalysisState
          item={item}
          isPending={false}
          isError={false}
          onRetry={() => {}}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.summary)).toBeInTheDocument();
    expect(screen.getByText(`#${item.rank}`)).toBeInTheDocument();
    expect(screen.getByText(`${item.viewCount} views`)).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(
      <ExampleAnalysisState
        item={undefined}
        isPending
        isError={false}
        onRetry={() => {}}
      />,
    );

    expect(screen.getByRole('status', { name: /loading example analysis/i })).toBeInTheDocument();
  });

  it('renders error state and retries', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ExampleAnalysisState
        item={undefined}
        isPending={false}
        isError
        onRetry={onRetry}
      />,
    );

    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('uses fallback values for nullable fields', () => {
    const fallbackItem = toHomeFeaturedAnalysis({
      ...analyticsMock[0],
      video: {
        ...analyticsMock[0].video!,
        title: null,
        thumbnail: null,
        channelName: null,
        duration: null,
      },
      analysis: {
        ...analyticsMock[0].analysis!,
        summary: null,
      },
    })!;

    render(
      <MemoryRouter>
        <ExampleAnalysisState
          item={fallbackItem}
          isPending={false}
          isError={false}
          onRetry={() => {}}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Untitled analysis')).toBeInTheDocument();
    expect(screen.getByText('Unknown channel')).toBeInTheDocument();
    expect(screen.getByText(/Open the full analysis to read the summary./i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Untitled analysis' })).toBeInTheDocument();
  });

  it('opens the result page CTA with analysis id', async () => {
    const user = userEvent.setup();
    mockedNavigate.mockReset();

    render(
      <MemoryRouter>
        <ExampleAnalysisState
          item={item}
          isPending={false}
          isError={false}
          onRetry={() => {}}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /open full example/i }));
    expect(mockedNavigate).toHaveBeenCalledWith(`/result?analysisId=${encodeURIComponent(item.analysisId)}`);
  });
});
