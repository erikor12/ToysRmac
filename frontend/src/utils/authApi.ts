export type ApiUser = { ID?: number; USER?: string; MAIL: string; CREATION?: string };
export type NormalizedUser = { id: number | null; name: string; email: string; createdAt: string | null } | null;

const API_BASE = import.meta.env.VITE_API_URL || 'https://toysrmac-backend.onrender.com';

type RequestResult = { ok: true; data: unknown } | { ok: false; error: string };

async function request(path: string, method = 'GET', body?: unknown): Promise<RequestResult> {
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
    const raw = r.data as Record<string, unknown> | null;
    const mapped: NormalizedUser = raw
        ? {
            id: (raw['ID'] as number) ?? (raw['id'] as number) ?? null,
            name: (raw['USER'] as string) ?? (raw['user'] as string) ?? '',
            email: (raw['MAIL'] as string) ?? (raw['mail'] as string) ?? '',
            createdAt: (raw['CREATION'] as string) ?? (raw['creation'] as string) ?? (raw['createdAt'] as string) ?? null,
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
    const dataObj = r.data as Record<string, unknown> | null;
    const rawUser = (dataObj?.['user'] as Record<string, unknown>) ?? null;
    const mapped: NormalizedUser = rawUser
        ? {
            id: (rawUser['ID'] as number) ?? (rawUser['id'] as number) ?? null,
            name: (rawUser['USER'] as string) ?? (rawUser['user'] as string) ?? '',
            email: (rawUser['MAIL'] as string) ?? (rawUser['mail'] as string) ?? '',
            createdAt: (rawUser['CREATION'] as string) ?? (rawUser['creation'] as string) ?? (rawUser['createdAt'] as string) ?? null,
        }
        : null;
    return { ok: true, user: mapped };
}
