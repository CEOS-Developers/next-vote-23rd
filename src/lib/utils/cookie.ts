export const getCookieToken = () => {
  if (typeof window === "undefined") return undefined;
  return document.cookie
    .split(";")
    .find(c => c.trim().startsWith("accessToken="))
    ?.trim()
    .substring("accessToken=".length);
};
