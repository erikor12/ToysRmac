import { useAuth } from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function ProfilePage() {
    const { state, logout } = useAuth();
    const user = state?.user;
    const navigate = useNavigate();

    if (!user) {
        // Seguridad adicional: si no hay user, redirigir a login
        navigate("/login");
        return null;
    }

    return (
        <main className="auth-page">
            <div className="auth-card profile-card">
                <h1>Mi cuenta</h1>
                <p className="lead">Detalles de tu perfil y opciones.</p>

                <div className="profile-grid">
                    <div className="profile-row">
                        <div className="label">Nombre</div>
                        <div className="value">{user.name}</div>
                    </div>

                    <div className="profile-row">
                        <div className="label">Email</div>
                        <div className="value">{user.email}</div>
                    </div>

                    <div className="profile-row">
                        <div className="label">Creado</div>
                        <div className="value">{user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</div>
                    </div>

                    <div className="profile-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/")}
                            type="button"
                        >
                            Volver al inicio
                        </button>

                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            type="button"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

