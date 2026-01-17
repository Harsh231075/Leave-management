import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { login, register } from '../services/authService';
import { getMyProfile } from '../services/employeeService';
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
                    // store token first to enable /employees/me
                    localStorage.setItem('token', response.token);
                    let mergedUser: User = response.user;
                    try {
                        const profile = await getMyProfile();
                        mergedUser = { ...response.user, ...profile } as User;
                    } catch (e) {
                        // ignore profile fetch errors; keep base user
                    }
                    set({
                        user: mergedUser,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
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
                    const regResponse = await register(credentials);
                    // If register doesn't return token, login to obtain token
                    let authUser: User | null = (regResponse as any)?.user ?? null;
                    let token: string | null = (regResponse as any)?.token ?? null;
                    if (!token) {
                        const loginResponse = await login({ email: credentials.email, password: credentials.password });
                        token = loginResponse.token;
                        authUser = loginResponse.user;
                    }
                    if (token) localStorage.setItem('token', token);
                    let mergedUser: User | null = authUser;
                    try {
                        if (token) {
                            const profile = await getMyProfile();
                            mergedUser = { ...(authUser as User), ...profile } as User;
                        }
                    } catch (e) { }
                    set({
                        user: mergedUser,
                        token: token,
                        isAuthenticated: !!token,
                        isLoading: false,
                    });
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
