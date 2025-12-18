export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  businessName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface ResetPasswordType {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetToken {
  email: string;
  token: string;
}

export interface InviteToken {
  email: string;
  token: string;
}