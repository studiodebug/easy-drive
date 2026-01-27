"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { User } from "@/types/user";

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshInFlight = useRef(false);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Email ou senha inválidos");
      const data = (await res.json()) as { user?: User };
      setUser(data.user ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const loadSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { method: "GET" });
      if (res.ok) {
        const data = (await res.json()) as { user?: User };
        setUser(data.user ?? null);
        return;
      }

      // If access token expired, try refresh once.
      if (res.status === 401 && !refreshInFlight.current) {
        refreshInFlight.current = true;
        const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
        if (refreshRes.ok) {
          const res2 = await fetch("/api/auth/session", { method: "GET" });
          if (res2.ok) {
            const data2 = (await res2.json()) as { user?: User };
            setUser(data2.user ?? null);
            return;
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setUser(null);
    } catch {
      setUser(null);
    } finally {
      refreshInFlight.current = false;
      setIsLoading(false);
      true;
    }
  }, []);

  const refreshSession = useCallback(async () => {
    if (refreshInFlight.current) return;
    refreshInFlight.current = true;
    const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
    if (!refreshRes.ok) {
      refreshInFlight.current = false;
      setUser(null);
      throw new Error("Failed to refresh session");
    }
    await loadSession();
  }, [loadSession]);

  useEffect(() => {
    setIsLoading(true);
    void loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signIn,
      signOut,
      refreshSession,
    };
  }, [user, isLoading, signIn, signOut, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
