const TOKEN_KEY = "accessToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7일

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_MAX_AGE}`;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
