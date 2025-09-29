import { User } from './user.model';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  identifier: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  // cas JWT standard
  accessToken?: string;
  token?: string; // fallback
  user?: User;

  // cas existant "message"
  message?: string; // "Authentication success" | "Registration success" etc.
  id?: string;
  firstName?: string;
  darkMode?: boolean;
  applications?: any;
  email?: string;
  lastName?: string;
}
