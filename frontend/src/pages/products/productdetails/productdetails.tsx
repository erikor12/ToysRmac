import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../../contexts/cartcontext";
import "./productdetails.css";

const MOCK = {
    mctoys: [{ id: "m1", title: "Mcd Happy Toy 1", price: 6.5, desc: "Coleccionable edición limitada." }],
    bktoys: [{ id: "b1", title: "BK King Toy 1", price: 7.0, desc: "Figura exclusiva Burger King." }],
};

export default function ProductDetails() {
    const { brand, id } = useParams<{ brand: string; id: string }>();
    const { dispatch } = useCart();
    const product = MOCK[brand as keyof typeof MOCK]?.find((p) => p.id === id);
    if (!product) return <div className="notfound">Producto no encontrado</div>;
    return (
        <section className="pd">
            <div className="pd-left" />
            <div className="pd-right">
                <h1>{product.title}</h1>
                <p className="pd-price">${product.price.toFixed(2)}</p>
                <p>{product.desc}</p>
                <div className="pd-actions">
                    <button onClick={() => dispatch({ type: "add", product: { id: product.id, brand: brand as any, title: product.title, price: product.price } })}>Agregar al carrito</button>
                </div>
            </div>
        </section>
    );
}

