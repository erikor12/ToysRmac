import "./about.css";

export default function About() {
    return (
        <section className="about-page">
            <div className="about-inner">
                <header className="about-header">
                    <h1>Nuestra colección</h1>
                    <p>Curada con foco en jugabilidad y exhibición. Inspirada en el lenguaje de diseño IKEA: limpieza, jerarquía y usabilidad.</p>
                </header>

                <div className="about-grid">
                    <article className="about-card">
                        <h3>Calidad</h3>
                        <p>Materiales duraderos, piezas con detalle y embalaje pensado para coleccionistas.</p>
                    </article>
                    <article className="about-card">
                        <h3>Series limitadas</h3>
                        <p>Lanzamientos periódicos y numerados para los coleccionistas más exigentes.</p>
                    </article>
                    <article className="about-card">
                        <h3>Conservación</h3>
                        <p>Consejos para mantener las figuras en perfecto estado y técnicas de display.</p>
                    </article>
                </div>
            </div>
        </section>
    );
}

