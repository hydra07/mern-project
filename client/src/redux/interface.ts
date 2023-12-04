export interface User {
  email: string;
  password: string;
  phone?: string | null;
}
export interface UserState {
  currentUser: User | null;
  loading: boolean;
  message: string | null;
}
