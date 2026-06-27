"use client";

import { supabase } from "@/lib/supabaseClient";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside contextProvider");
    return context;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }
    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signin = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }, []);

  const value = {
    user,
    session,
    loading,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
