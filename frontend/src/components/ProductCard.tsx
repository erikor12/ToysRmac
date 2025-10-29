import React from "react";

export default function ProductCard({ product, onDetails, onAdd }: any) {
    return (
        <article className="product-card">
            <h3>{product.title}</h3>
            <div>${product.price.toFixed(2)}</div>
            <div>
                <button onClick={(e) => { e.stopPropagation(); onDetails(product); }}>Detalles</button>
                <button onClick={(e) => { e.stopPropagation(); onAdd(product); }}>Añadir</button>
            </div>
        </article>
    );
}

