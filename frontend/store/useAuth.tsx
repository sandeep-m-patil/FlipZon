
import { create } from 'zustand';
import axios from '@/lib/axios'

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get('/api/auth/me'); // your backend endpoint
      set({ user: res.data.user, isLoading: false });
    } catch (err) {
      set({ user: null, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),
  logout: async () => {
    await axios.post('/api/auth/logout'); // your backend logout route
    set({ user: null });
  },
}));
