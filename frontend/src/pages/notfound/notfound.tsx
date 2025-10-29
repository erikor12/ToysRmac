import React, { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFoundPage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="nf-root" role="main">
            <div className="nf-card" aria-labelledby="nf-title">
                <header className="nf-header">
                    <h1 id="nf-title" className="nf-title">404</h1>
                    <p className="nf-sub">Página no encontrada</p>
                </header>

                <section className="nf-body">
                    <p>
                        Lo sentimos, la página que buscás no existe o fue movida.
                        Podés volver al inicio o revisar las secciones disponibles.
                    </p>

                    <div className="nf-actions">
                        <button
                            type="button"
                            className="nf-btn nf-btn-primary"
                            onClick={() => navigate(-1)}
                            aria-label="Volver a la página anterior"
                        >
                            Volver
                        </button>

                        <Link to="/" className="nf-btn nf-btn-ghost" aria-label="Ir al inicio">
                            Ir al inicio
                        </Link>
                    </div>
                </section>

                <footer className="nf-footer">
                    <small>Si el problema persiste, recargá la página o contactá al administrador.</small>
                </footer>
            </div>
        </main>
    );
}

