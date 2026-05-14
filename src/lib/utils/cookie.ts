export const getCookieToken = () =>
  document.cookie
    .split(";")
    .find(c => c.trim().startsWith("accessToken="))
    ?.trim()
    .substring("accessToken=".length);
