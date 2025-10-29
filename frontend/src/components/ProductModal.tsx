import React, { useEffect } from "react";

export default function ProductModal({ product, onClose }: any) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!product) return null;
    return (
        <div className="pm-overlay" onClick={onClose}>
            <div className="pm-card" onClick={(e) => e.stopPropagation()}>
                <header><h2>{product.title}</h2><button onClick={onClose}>✕</button></header>
                <div>
                    <p>{product.short}</p>
                    <p>{product.long}</p>
                </div>
            </div>
        </div>
    );
}

