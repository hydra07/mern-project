export interface User {
  email: string;
  password: string;
  phone: string;
}
export interface UserState {
  currentUser: User | null;
  error: any;
  loading: boolean;
  message: string | null;
}
