import React from "react";
import { Link } from "react-router-dom";
import "./mctoys.css";
import { useCart } from "../../../contexts/cartcontext";

const PRODUCTS = [
    { id: "m1", title: "Mcd Happy Toy 1", price: 6.5, img: "" },
    { id: "m2", title: "Mcd Happy Toy 2", price: 5.0, img: "" },
];

export default function McToys() {
    const { dispatch } = useCart();
    return (
        <section className="brand-page">
            <h2>McDonald's Toys Collection</h2>
            <p className="brand-lead">Figuras y coleccionables de Burger King, seleccionadas para exhibición y juego.</p>
            <div className="grid">
                {PRODUCTS.map((p) => (
                    <article key={p.id} className="card">
                        <div className="thumb" />
                        <h3>{p.title}</h3>
                        <p className="price">${p.price.toFixed(2)}</p>
                        <div className="actions">
                            <button onClick={() => dispatch({ type: "add", product: { ...p, brand: "mctoys" } })}>Add</button>
                            <Link to={`/product/mctoys/${p.id}`} className="details">Detalles</Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

