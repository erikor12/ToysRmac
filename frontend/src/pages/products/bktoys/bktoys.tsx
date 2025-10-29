import React from "react";
import { Link } from "react-router-dom";
import "./bktoys.css";
import { useCart } from "../../../contexts/cartcontext";

const PRODUCTS = [
    { id: "b1", title: "BK King Robot", price: 7.0, img: "/src/assets/bk-robot.png", desc: "Figura articulada. Ideal para display y colección.", year: 2020, limited: false },
    { id: "b2", title: "BK King Dragón", price: 8.0, img: "/src/assets/bk-dragon.png", desc: "Edición limitada con base numerada.", year: 2023, limited: true },
];

export default function BKToys() {
    const { dispatch } = useCart();

    return (
        <section className="brand-page">
            <h2>Burger King Toys Collection</h2>
            <p className="brand-lead">Figuras y coleccionables de Burger King, seleccionadas para exhibición y juego.</p>

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
                                        product: { id: p.id, brand: "bktoys", title: p.title, price: p.price },
                                    })
                                }
                                className="add-btn"
                            >
                                Añadir
                            </button>
                            <Link to={`/product/bktoys/${p.id}`} className="details">
                                Detalles
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

