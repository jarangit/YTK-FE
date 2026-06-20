export const ACCESS_TOKEN_STORAGE_KEY = 'youtive_access_token';

export function readStoredAccessToken() {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? '';
}

export function writeStoredAccessToken(accessToken: string) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearStoredAccessToken() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
