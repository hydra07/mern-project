import { cleanEnv, str } from 'envalid';

export default cleanEnv(import.meta.env, {
  VITE_FIREBASE_API_KEY: str(),
  VITE_API: str(),
});
