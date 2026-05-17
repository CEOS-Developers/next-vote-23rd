export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface EmailVerificationSendRequest {
  email: string;
}

export interface EmailVerificationVerifyRequest {
  email: string;
  code: string;
}

export interface EmailVerificationVerifyResponse {
  emailVerificationToken: string;
}
