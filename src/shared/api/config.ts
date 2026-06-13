export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false' || !API_BASE_URL;

export const MOCK_LATENCY_MS = 350;

export function mockDelay(ms = MOCK_LATENCY_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
