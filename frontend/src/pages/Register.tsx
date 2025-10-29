import React, { useState } from "react";
import { createAccountB64 } from "./../utils/authClientB64";
import { useAuth } from "./../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        const res = await createAccountB64(name.trim(), email.trim(), password);
        setLoading(false);
        if (!res.ok) {
            setMsg(res.error || "Error");
            return;
        }

        // Auto-login: set user in context
        try {
            if (res.user) {
                auth.setUser(res.user);
            } else {
                console.warn("No se encontró usuario en la respuesta", res);
            }
        } catch (err) {
            console.warn("No se pudo setear usuario en contexto", err);
        }

        // Redirigir a home
        navigate("/");
    }

    return (
        <main className="register-page">
            <div className="register-card">
                <h1>Crear cuenta (local)</h1>
                <p>Esta cuenta se guarda en localStorage para pruebas.</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>

                    <label>
                        Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                    </label>

                    <label>
                        Contraseña
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    </label>

                    <div className="actions">
                        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Creando..." : "Crear cuenta"}</button>
                    </div>

                    {msg && <div className={`feedback ${msg.includes("Error") ? "error" : "success"}`}>{msg}</div>}
                </form>
            </div>
        </main>
    );
}

