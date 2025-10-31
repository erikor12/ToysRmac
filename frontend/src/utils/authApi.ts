export type ApiUser = { ID?: number; USER?: string; MAIL: string; CREATION?: string };
export type NormalizedUser = { id: number | null; name: string; email: string; createdAt: string | null } | null;

const API_BASE = import.meta.env.VITE_API_URL || 'https://toysrmac-backend.onrender.com';

type RequestResult = { ok: true; data: any } | { ok: false; error: string };

async function request(path: string, method = 'GET', body?: any): Promise<RequestResult> {
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const err = data?.error ?? `HTTP ${res.status}`;
        return { ok: false, error: err };
    }
    return { ok: true, data };
}

export async function createAccountApi(name: string, email: string, password: string): Promise<{ ok: boolean; user?: NormalizedUser; error?: string }> {
    if (!name || !email || !password) return { ok: false, error: 'Faltan campos' };
    const payload = { USER: name, MAIL: email, PASSWORD: password };
    const r = await request('/clients', 'POST', payload);
    if (!r.ok) return { ok: false, error: r.error };
    // r.data should be the created user (without password) with fields: ID, USER, MAIL, CREATION
    const raw = r.data;
    const mapped: NormalizedUser = raw
        ? {
              id: raw.ID ?? raw.id ?? null,
              name: raw.USER ?? raw.user ?? '',
              email: raw.MAIL ?? raw.mail ?? '',
              createdAt: raw.CREATION ?? raw.creation ?? raw.createdAt ?? null,
          }
        : null;
    return { ok: true, user: mapped };
}

export async function loginApi(email: string, password: string): Promise<{ ok: boolean; user?: NormalizedUser; error?: string }> {
    if (!email || !password) return { ok: false, error: 'Faltan credenciales' };
    const payload = { MAIL: email, PASSWORD: password };
    const r = await request('/clients/login', 'POST', payload);
    if (!r.ok) return { ok: false, error: r.error };
    // r.data should contain { ok: true, user }
    const rawUser = r.data?.user ?? null;
    const mapped: NormalizedUser = rawUser
        ? {
              id: rawUser.ID ?? rawUser.id ?? null,
              name: rawUser.USER ?? rawUser.user ?? '',
              email: rawUser.MAIL ?? rawUser.mail ?? '',
              createdAt: rawUser.CREATION ?? rawUser.creation ?? rawUser.createdAt ?? null,
          }
        : null;
    return { ok: true, user: mapped };
}
