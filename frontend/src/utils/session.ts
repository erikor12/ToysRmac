export function persistUserToStorage(key: string, user: Record<string, unknown> | null) {
    try {
        if (user) globalThis.localStorage?.setItem(key, JSON.stringify(user));
        else globalThis.localStorage?.removeItem(key);
    } catch (e) {
        console.warn('persistUserToStorage failed', e);
    }
}

export function readUserFromStorage(key: string): Record<string, unknown> | null {
    try {
        const raw = globalThis.localStorage?.getItem(key);
        return raw ? JSON.parse(raw) as Record<string, unknown> : null;
    } catch (e) {
        console.warn('readUserFromStorage failed', e);
        return null;
    }
}
