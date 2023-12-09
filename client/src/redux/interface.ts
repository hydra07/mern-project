export interface User {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  avatar?: string | null;
  address?: string | null;
  birthday?: string | null;
}
export interface UserState {
  currentUser: User | null;
  loading: boolean;
  message: string | null;
  error: string | null;
}
