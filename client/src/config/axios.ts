import axios from 'axios';
import env from '../utils/validateEnv';

const token = localStorage.getItem('root');
// const token =
const headers = {
  Authorization: `Bearer ${token}`,
};

const instance = axios.create({
  baseURL: env.VITE_API,
  headers: headers,
});

export default instance;
