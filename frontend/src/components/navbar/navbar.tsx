import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useCart } from "../../contexts/cartcontext";
import { useAuth } from "../../contexts/authcontext";
import SearchBar from "../SearchBar";

export default function Navbar() {
    const { state: cartState, dispatch: cartDispatch } = useCart();
    const { state: authState, logout } = useAuth();
    const navigate = useNavigate();

    const totalQty = cartState?.items?.reduce((s, i) => s + (i.qty || 0), 0) ?? 0;

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!userRef.current) return;
            if (!userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
        }
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setUserMenuOpen(false);
                setMenuOpen(false);
            }
        }
        document.addEventListener("click", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("click", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    function toggleCart() {
        try {
            cartDispatch({ type: "toggle" });
        } catch (err) {
            console.error("Navbar: error toggling cart", err);
        }
        setMenuOpen(false);
    }

    return (
        <header className="nav" role="banner">
            <div className="nav-inner">
                <div className="nav-left">
                    <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
                        <span className="nav-ikea">ToysRmac</span>
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <SearchBar />
                    </div>
                </div>

                <button
                    className={`hamburger ${menuOpen ? "is-open" : ""}`}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                    type="button"
                >
                    <span className="hb-line hb-line-1" />
                    <span className="hb-line hb-line-2" />
                    <span className="hb-line hb-line-3" />
                </button>

                <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Navegación principal">
                    <Link to="/mctoys" onClick={() => setMenuOpen(false)}>
                        McDonald's
                    </Link>
                    <Link to="/bktoys" onClick={() => setMenuOpen(false)}>
                        Burger King
                    </Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>
                        About
                    </Link>

                    <button className="cart-inline" onClick={() => { toggleCart(); setMenuOpen(false); }} aria-label="Abrir carrito (móvil)" type="button">
                        Carrito <span className="cart-count-inline">{totalQty}</span>
                    </button>
                </nav>

                <div className="nav-actions" role="navigation" aria-label="Acciones">
                    <button className="cart-btn" onClick={() => toggleCart()} aria-label="Abrir carrito" type="button">
                        Carrito <span className="cart-count">{totalQty}</span>
                    </button>

                    <div className="nav-user" ref={userRef} aria-haspopup="menu" aria-expanded={userMenuOpen}>
                        {authState?.user ? (
                            <>
                                <button className="user-toggle" onClick={() => setUserMenuOpen((s) => !s)} aria-label={userMenuOpen ? "Cerrar opciones de usuario" : "Abrir opciones de usuario"} type="button">
                                    <span className="user-name">Hola, {authState.user.name}</span>
                                    <span className="user-caret" aria-hidden>
                                        ▾
                                    </span>
                                </button>

                                <div className={`user-dropdown ${userMenuOpen ? "open" : ""}`} role="menu">
                                    <button className="user-item" onClick={() => { setUserMenuOpen(false); navigate("/profile"); }} role="menuitem" type="button">
                                        Mi cuenta
                                    </button>

                                    <button className="logout-btn" onClick={() => { logout(); setUserMenuOpen(false); }} role="menuitem" type="button">
                                        Cerrar sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <Link to="/register" className="btn-outline" onClick={() => setMenuOpen(false)}>
                                    Crear cuenta
                                </Link>
                                <Link to="/login" className="btn-primary" onClick={() => setMenuOpen(false)}>
                                    Iniciar sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

