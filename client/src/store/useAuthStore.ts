import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { login, register } from '../services/authService';
import api from '../services/api';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await login(credentials);
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    localStorage.setItem('token', response.token);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.error || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },
            register: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await register(credentials);
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    localStorage.setItem('token', response.token);
                } catch (error: any) {
                    set({
                        error: error.response?.data?.error || 'Registration failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
                try {
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth-storage');
                } catch (e) { }
                try {
                    if (api && api.defaults && api.defaults.headers) {
                        delete api.defaults.headers.common['Authorization'];
                    }
                } catch (e) { }
                try {
                    localStorage.setItem('logout', Date.now().toString());
                } catch (e) { }
            },
            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
        }
    )
);
