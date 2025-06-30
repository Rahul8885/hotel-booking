import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate: string;
  token?: string; // if backend returns token
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = '@hotel_app_user';
const API_BASE_URL = 'https://717b-13-222-49-166.ngrok-free.app/api/auth'; // <-- replace this with your actual backend URL

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in with:', { email, password });
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      const userPayload = data.data.user;
       const token = data.data.token;
if (!userPayload) {
  return { success: false, error: 'No user data returned from API' };
}

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

            const userData: User = {
          id: userPayload.id.toString(),  // ensure it's a string
          name: userPayload.fullName,
          email: userPayload.email,
          phone: userPayload.phone,
          avatar: userPayload.profileImage || undefined,
          joinDate: new Date().toISOString().split('T')[0], // or better: fetch from API if available
          token: token || undefined, // store token if available
        };
      setUser(userData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: JSON.stringify(error) || 'Sign in failed. Please try again.' };
    }
  };

  const signUp = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, password, phone }),
      });

      const data = await response.json();
         const userPayload = data.data.user;
             const token = data.data.token;
if (!userPayload) {
  return { success: false, error: 'No user data returned from API' };
}

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

            const userData: User = {
          id: userPayload.id.toString(),  // ensure it's a string
          name: userPayload.fullName,
          email: userPayload.email,
          phone: userPayload.phone,
          avatar: userPayload.profileImage || undefined,
          joinDate: new Date().toISOString().split('T')[0], // or better: fetch from API if available
          token: token || undefined, // store token if available
        };
      setUser(userData);
    
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Sign up failed. Please try again.' };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
