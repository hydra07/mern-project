export interface User {
  email: string | null;
  password?: string | null;
  phone?: string | null;
  avatar?: string | null;
  address?: string | null;
}
export interface UserState {
  currentUser: User | null;
  loading: boolean;
  message: string | null;
  error: string | null;
}
