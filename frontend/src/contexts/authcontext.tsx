import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { loginB64 } from "../utils/authClientB64";

type User = { id: string; name: string; email: string; createdAt: string } | null;

type State = { user: User; ready: boolean };
type Action =
    | { type: "login"; payload: User }
    | { type: "logout" }
    | { type: "ready"; payload: boolean };

const initial: State = { user: null, ready: false };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload };
        case "logout":
            return { ...state, user: null };
        case "ready":
            return { ...state, ready: action.payload };
        default:
            return state;
    }
}

const AuthContext = createContext<{
    state: State;
    login: (emailOrName: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    setUser: (user: User) => void;
    logout: () => void;
}>({
    state: initial,
    login: async () => ({ ok: false, error: "no impl" }),
    setUser: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initial);

    useEffect(() => {
        // intentar restaurar sesión desde localStorage (si guardás token/user)
        try {
            const raw = localStorage.getItem("session_user_v1");
            if (raw) {
                const user = JSON.parse(raw);
                dispatch({ type: "login", payload: user });
            }
        } catch { }
        dispatch({ type: "ready", payload: true });
    }, []);

    function persist(user: User | null) {
        try {
            if (user) localStorage.setItem("session_user_v1", JSON.stringify(user));
            else localStorage.removeItem("session_user_v1");
        } catch { }
    }

    async function login(emailOrName: string, password: string) {
        // aquí asumimos email + password; si en tu UI quieres usar name en vez de email, adapta
        const res = await loginB64(emailOrName, password);
        if (!res.ok) return { ok: false, error: res.error };
        dispatch({ type: "login", payload: res.user ?? null });
        persist(res.user ?? null);
        return { ok: true };
    }

    function setUser(user: User) {
        dispatch({ type: "login", payload: user });
        persist(user);
    }

    function logout() {
        dispatch({ type: "logout" });
        persist(null);
    }

    return (
        <AuthContext.Provider value={{ state, login, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

