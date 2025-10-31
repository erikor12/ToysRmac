import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
import "./login.css";

export default function Login() {
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    type LocationState = { from?: { pathname?: string } } | undefined;
    const from = ((location.state as LocationState)?.from?.pathname) || "/";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await auth.login(email.trim(), password);
            if (!res.ok) {
                setError(res.error || "Credenciales inválidas");
                return;
            }
            navigate(from, { replace: true });
        } catch (err) {
            console.warn('login submit error', err);
            setError("Error al autenticar");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="login-page">
            <div className="login-card">
                <h1>Iniciar sesión</h1>
                <p>Ingresá con tu cuenta creada previamente.</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                    </label>

                    <label>
                        Contraseña
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    </label>

                    {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}

                    <div className="login-actions">
                        <button type="submit" disabled={submitting}>{submitting ? "Entrando..." : "Entrar"}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
