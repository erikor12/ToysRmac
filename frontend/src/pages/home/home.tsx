import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
    return (
        <section className="home-hero">
            <div className="hero-inner">
                <div className="hero-left">
                    <h1>Juguetes coleccionables</h1>
                    <p className="lead">Descubrí nuestras colecciones de McDonald's y Burger King con diseño inspirado en IKEA: claro, funcional y con foco en la colección.</p>
                    <div className="hero-actions">
                        <Link to="/mctoys" className="btn primary">Ver McToys</Link>
                        <Link to="/bktoys" className="btn outline">Ver BK Toys</Link>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="hero-card">
                        <h3>Destacados</h3>
                        <ul>
                            <li>Figuras limitadas</li>
                            <li>Series temáticas</li>
                            <li>Accesorios y bases</li>
                        </ul>
                        <Link to="/about" className="btn small">Sobre la colección</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

