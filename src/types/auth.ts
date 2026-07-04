export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  avatar?: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  googleId?: string;
  firebaseUid?: string;
  provider?: "local" | "google" | "firebase";
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginFormData {
  email?: string;
  mobile?: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface OtpFormData {
  identifier: string;
  otp: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
