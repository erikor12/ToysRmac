/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import type { ReactNode } from "react";
import { loginApi } from "../utils/authApi";
import { persistUserToStorage, readUserFromStorage } from "../utils/session";

type User = { id: number | null; name: string; email: string; createdAt: string | null } | null;

type State = {
    loading: boolean; user: User; ready: boolean 
};
type Action =
    | { type: "login"; payload: User }
    | { type: "logout" }
    | { type: "ready"; payload: boolean };

const initial: State = { loading: false, user: null, ready: false };
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

// persistence moved to utils/session.ts

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

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [state, dispatch] = useReducer(reducer, initial);

    useEffect(() => {
        // intentar restaurar sesión desde localStorage (si guardás token/user)
        try {
            const parsed = readUserFromStorage("session_user_v1");
            if (parsed && typeof parsed.email === 'string') {
                dispatch({ type: "login", payload: parsed } as Action);
            }
        } catch (e) {
            console.warn('Failed to restore session:', e);
        }
        dispatch({ type: "ready", payload: true });
    }, []);

    // use module-scope helper

    async function login(emailOrName: string, password: string) {
        // aquí asumimos email + password; si en tu UI quieres usar name en vez de email, adapta
        const res = await loginApi(emailOrName, password);
        if (!res.ok) return { ok: false, error: res.error };
        const user = res.user ?? null;
        dispatch({ type: "login", payload: user });
        persistUserToStorage("session_user_v1", user);
        return { ok: true };
    }

    function setUser(user: User) {
        dispatch({ type: "login", payload: user });
        persistUserToStorage("session_user_v1", user);
    }

    function logout() {
        dispatch({ type: "logout" });
        persistUserToStorage("session_user_v1", null);
    }

    const value = useMemo(() => ({ state, login, setUser, logout }), [state]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

