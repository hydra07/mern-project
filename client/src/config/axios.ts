import axios from 'axios';
import env from '../utils/validateEnv';

const axiosInstance = (token: string) => {
  // console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const instance = axios.create({
    baseURL: env.VITE_API + `/api/`,
    headers: headers,
  });
  return instance;
};
export default axiosInstance;
