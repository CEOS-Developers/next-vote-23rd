import { setAuthCookie } from "@/app/actions/auth";
import { setAccessToken } from "@/lib/apis/api";

export const saveToken = async (token: string) => {
  setAccessToken(token);
  await setAuthCookie(token);
};
