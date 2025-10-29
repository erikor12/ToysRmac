import React from "react";
import { Link } from "react-router-dom";
import "./mctoys.css";
import { useCart } from "../../../contexts/cartcontext";


const PRODUCTS = [
    { id: "m1", title: "Mc Happy Toy Astronauta", price: 7.0, img: "/src/assets/bk-robot.png", desc: "Figura articulada. Ideal para display y colección.", year: 2020, limited: false },
    { id: "m2", title: "Mc Happy Toy Pirata", price: 8.0, img: "/src/assets/bk-dragon.png", desc: "Edición limitada con base numerada.", year: 2023, limited: true },
];

export default function BKToys() {
    const { dispatch } = useCart();

    return (
        <section className="brand-page">
            <h2>Mcdonald's Toys Collection</h2>
            <p className="brand-lead">Figuras y coleccionables de McDonald's, seleccionadas para exhibición y juego.</p>

            <div className="grid">
                {PRODUCTS.map((p) => (
                    <article key={p.id} className="card">
                        <div
                            className="thumb"
                            style={{ backgroundImage: `url(${p.img ?? "/src/assets/placeholder.png"})` }}
                            aria-hidden
                        />
                        <h3>{p.title}</h3>
                        <p className="price">${p.price.toFixed(2)}</p>
                        <p className="card-desc">{p.desc}</p>
                        <div className="actions">
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "add",
                                        product: { id: p.id, brand: "mctoys", title: p.title, price: p.price },
                                    })
                                }
                                className="add-btn"
                            >
                                Añadir
                            </button>
                            <Link to={`/product/mctoys/${p.id}`} className="details">
                                Detalles
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

