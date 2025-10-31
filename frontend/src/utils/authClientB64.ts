import base64 from "react-native-base64";

export type UserB64 = {
    id: string;
    name: string;
    email: string;
    passwordB64: string;
    createdAt: string;
};

const KEY = "toy_users_b64_v1";

function read(): UserB64[] {
    try {
        const raw = globalThis.localStorage?.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        console.warn('authClientB64: failed to read users from localStorage');
        return [];
    }
}
function write(users: UserB64[]) {
    try {
        globalThis.localStorage?.setItem(KEY, JSON.stringify(users));
    } catch (e) {
        console.warn('authClientB64: failed to write users to localStorage', e);
    }
}
function makeId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export async function createAccountB64(name: string, email: string, password: string) {
    if (!name || !email || !password) return { ok: false, error: "Faltan campos" };

    const users = read();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return { ok: false, error: "Email ya registrado" };

    try {
        const enc = base64.encode(password);
        const user: UserB64 = {
            id: makeId(),
            name,
            email,
            passwordB64: enc,
            createdAt: new Date().toISOString(),
        };
        users.push(user);
        write(users);
        return { ok: true, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } };
    } catch (err) {
        console.warn('createAccountB64 error', err);
        return { ok: false, error: "Error al crear la cuenta" };
    }
}

export async function loginB64(email: string, password: string) {
    if (!email || !password) return { ok: false, error: "Faltan credenciales" };

    const users = read();
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u) return { ok: false, error: "Usuario no encontrado" };

    try {
        const enc = base64.encode(password);
        if (u.passwordB64 !== enc) return { ok: false, error: "Contraseña incorrecta" };
        return { ok: true, user: { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt } };
    } catch (e) {
        console.warn('loginB64 error', e);
        return { ok: false, error: "Error en autenticación" };
    }
}

export function listUsersB64() {
    return read().map((u) => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt }));
}
export function resetUsersB64() {
    try {
        globalThis.localStorage?.removeItem(KEY);
    } catch (e) {
        console.warn('authClientB64: failed to remove users from localStorage', e);
    }
}

