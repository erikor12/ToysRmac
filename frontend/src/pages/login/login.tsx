import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
import "./login.css";

export default function Login() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        await login(name || "User", email || undefined);
        setSubmitting(false);
        navigate(from, { replace: true });
    }

    return (
        <main className="login-page">
            <div className="login-card">
                <h1>Iniciar sesión</h1>
                <p>Iniciá sesión para completar tus compras.</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email (opcional)
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </label>
                    <div className="login-actions">
                        <button type="submit" disabled={submitting}>{submitting ? "Entrando..." : "Entrar"}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

