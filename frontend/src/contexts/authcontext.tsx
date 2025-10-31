import { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import type { ReactNode } from "react";
import { loginApi } from "../utils/authApi";

type User = { id: number | null; name: string; email: string; createdAt: string | null } | null;

type State = {
    loading: any; user: User; ready: boolean 
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

// persistence helper in module scope to satisfy lint rules
function persistUser(user: User | null) {
    try {
        if (user) localStorage.setItem("session_user_v1", JSON.stringify(user));
        else localStorage.removeItem("session_user_v1");
    } catch (e) {
        console.warn('Failed to persist session:', e);
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

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [state, dispatch] = useReducer(reducer, initial);

    useEffect(() => {
        // intentar restaurar sesión desde localStorage (si guardás token/user)
        try {
            const raw = localStorage.getItem("session_user_v1");
            if (raw) {
                const parsed = JSON.parse(raw);
                // basic shape check
                if (parsed && typeof parsed.email === 'string') {
                    dispatch({ type: "login", payload: parsed });
                }
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
    persistUser(user);
        return { ok: true };
    }

    function setUser(user: User) {
        dispatch({ type: "login", payload: user });
    persistUser(user);
    }

    function logout() {
        dispatch({ type: "logout" });
    persistUser(null);
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

