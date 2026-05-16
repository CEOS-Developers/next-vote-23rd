import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  EmailVerificationSendRequest,
  EmailVerificationVerifyRequest,
  EmailVerificationVerifyResponse,
} from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function fetchApi<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `${res.status} 오류가 발생했습니다.`);
  }

  return res.json();
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  return fetchApi<AuthResponse>("/api/auth/login", data);
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  return fetchApi<AuthResponse>("/api/auth/signup", data);
}

export async function sendEmailVerification(
  data: EmailVerificationSendRequest,
): Promise<void> {
  await fetchApi<unknown>("/api/auth/email-verifications", data);
}

export async function verifyEmailCode(
  data: EmailVerificationVerifyRequest,
): Promise<EmailVerificationVerifyResponse> {
  return fetchApi<EmailVerificationVerifyResponse>(
    "/api/auth/email-verifications/confirmations",
    data,
  );
}
