export type CookieConsentChoice = 'accepted' | 'declined';

const COOKIE_CONSENT_STORAGE_KEY = 'youtive_cookie_consent';

export function getCookieConsentChoice(): CookieConsentChoice | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const storedValue = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return storedValue === 'accepted' || storedValue === 'declined'
    ? storedValue
    : null;
}

export function setCookieConsentChoice(choice: CookieConsentChoice) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
}
