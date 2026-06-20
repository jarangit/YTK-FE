import { API_BASE_URL } from './config';
import { readStoredAccessToken } from '../auth/tokenStorage';

interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
  auth?: boolean;
}

export class ApiRequestError<T = unknown> extends Error {
  status: number;
  data?: T;

  constructor(message: string, status: number, data?: T) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.data = data;
  }
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const base = API_BASE_URL
    ? `${API_BASE_URL.replace(/\/+$/, '')}/`
    : window.location.origin;
  const url = new URL(normalizedPath, base);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return API_BASE_URL ? url.toString() : `${path}${url.search}`;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { query, headers, auth = true, ...init } = options;
  const requestHeaders = new Headers(headers);
  const accessToken = auth ? readStoredAccessToken() : '';

  if (!requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (accessToken && !requestHeaders.has('Authorization')) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(buildUrl(path, query), {
    ...init,
    credentials: init.credentials ?? 'include',
    headers: requestHeaders,
  });

  if (!response.ok) {
    let errorData: unknown;

    try {
      errorData = await response.json();
    } catch {
      errorData = undefined;
    }

    throw new ApiRequestError(`API request failed: ${response.status}`, response.status, errorData);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
