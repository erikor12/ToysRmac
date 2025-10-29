import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; email?: string };
type State = { user: User | null; loading: boolean };

type AuthContextShape = {
    state: State;
    login: (name: string, email?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<State>({ user: null, loading: true });

    useEffect(() => {
        try {
            const raw = localStorage.getItem("auth_v1");
            if (raw) {
                setState({ user: JSON.parse(raw), loading: false });
            } else {
                setState({ user: null, loading: false });
            }
        } catch {
            setState({ user: null, loading: false });
        }
    }, []);

    useEffect(() => {
        try {
            if (state.user) localStorage.setItem("auth_v1", JSON.stringify(state.user));
            else localStorage.removeItem("auth_v1");
        } catch { }
    }, [state.user]);

    async function login(name: string, email?: string) {
        // Simula login; en producción reemplazar por API
        const user = { id: String(Date.now()), name, email };
        setState({ user, loading: false });
    }

    function logout() {
        setState({ user: null, loading: false });
    }

    function isAuthenticated() {
        return !!state.user;
    }

    return (
        <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

