import axios from 'axios';

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, '');
}

function getBaseUrl() {
  const publicUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (publicUrl && publicUrl.trim()) return normalizeBaseUrl(publicUrl.trim());
  return '/api';
}

export const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
