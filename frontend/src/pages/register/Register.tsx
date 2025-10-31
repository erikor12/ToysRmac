import React, { useState } from "react";
import { createAccountApi } from "../../utils/authApi";
import { useAuth } from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

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
        const res = await createAccountApi(name.trim(), email.trim(), password);
        setLoading(false);
        if (!res.ok) {
            setMsg(res.error || "Error");
            return;
        }

        // Auto-login: set user in context using API response
        if (res.user) {
            auth.setUser(res.user);
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

