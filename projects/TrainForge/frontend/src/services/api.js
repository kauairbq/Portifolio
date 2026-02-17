import axios from 'axios';

const baseURL = `${window.location.origin}/Fullstack%20MD/projects/TrainForge/backend/api`;

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trainforge_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('trainforge_refresh_token');
  if (!refreshToken) return null;
  const { data } = await api.post('/auth.php?action=refresh', { refreshToken });
  if (!data?.ok) return null;
  localStorage.setItem('trainforge_access_token', data.accessToken);
  localStorage.setItem('trainforge_refresh_token', data.refreshToken);
  localStorage.setItem('trainforge_user', JSON.stringify(data.user));
  return data.accessToken;
}

