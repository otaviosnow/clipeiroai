// 🔐 USE AUTH HOOK
import { create } from 'zustand';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuth = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  // Carregar dados do localStorage
  initialize: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      });
    }
  },

  // Login
  login: async (email, password) => {
    set({ isLoading: true });
    
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Login realizado com sucesso!');
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  // Register
  register: async (name, email, password) => {
    set({ isLoading: true });
    
    try {
      const response = await authAPI.register({ name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Conta criada com sucesso!');
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    set({
      token: null,
      user: null,
      isAuthenticated: false
    });

    toast.success('Logout realizado!');
  },

  // Refresh user data
  refreshUser: async () => {
    try {
      const response = await authAPI.getMe();
      const user = response.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  }
}));

export default useAuth;
