import { useEffect } from "react";

type Product = { id: string; title: string; short?: string; long?: string };

export default function ProductModal({ product, onClose }: Readonly<{ product?: Product | null; onClose: () => void }>) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!product) return null;
    return (
        <button className="pm-overlay" type="button" aria-label="Cerrar" onClick={onClose} onKeyDown={(e) => { if (e.key === 'Enter') onClose(); }}>
            <div className="pm-card">
                <header><h2>{product.title}</h2><button onClick={onClose}>✕</button></header>
                <div>
                    <p>{product.short}</p>
                    <p>{product.long}</p>
                </div>
            </div>
        </button>
    );
}

