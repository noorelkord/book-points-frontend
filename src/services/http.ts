import axios from 'axios';
import { useAuthStore } from '../app/store/auth';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;


