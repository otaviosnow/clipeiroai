// 🌐 API SERVICE
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Criar instância axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || 'Erro na requisição';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Upload
export const uploadAPI = {
  uploadVideo: (formData, onProgress) => api.post('/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress
  }),
  uploadBackgrounds: (formData) => api.post('/upload/backgrounds', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyVideos: (type, page) => api.get('/upload/my-videos', { params: { type, page } }),
  deleteVideo: (id) => api.delete(`/upload/${id}`)
};

// Clips
export const clipsAPI = {
  generateClips: (data) => api.post('/clips/generate', data),
  getClipsByVideo: (videoId) => api.get(`/clips/${videoId}`),
  downloadClip: (id) => api.get(`/clips/download/${id}`),
  deleteClip: (id) => api.delete(`/clips/${id}`)
};

// Posts
export const postsAPI = {
  schedulePost: (data) => api.post('/posts/schedule', data),
  getPosts: (params) => api.get('/posts', { params }),
  getPost: (id) => api.get(`/posts/${id}`),
  cancelPost: (id) => api.delete(`/posts/${id}`)
};

// Admin
export const adminAPI = {
  createProfile: (data) => api.post('/admin/profiles', data),
  getProfiles: () => api.get('/admin/profiles'),
  updateProfile: (id, data) => api.put(`/admin/profiles/${id}`, data),
  deleteProfile: (id) => api.delete(`/admin/profiles/${id}`),
  getStats: () => api.get('/admin/stats'),
  getLogs: (params) => api.get('/admin/logs', { params })
};

// Analytics
export const analyticsAPI = {
  getAnalytics: (params) => api.get('/analytics', { params }),
  getDashboard: () => api.get('/analytics/dashboard')
};

export default api;
