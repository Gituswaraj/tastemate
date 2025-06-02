import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setSession: (session) => set({ session }),
      
      logout: () => set({ 
        user: null, 
        session: null, 
        isAuthenticated: false 
      }),

      // Helper function to get user role
      getUserRole: () => {
        return get().user?.role || 'user';
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;