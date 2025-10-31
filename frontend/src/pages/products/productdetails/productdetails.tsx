import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../../contexts/cartcontext";
import "./productdetails.css";

type Product = { id: string | number; title?: string; price?: number; desc?: string; [key: string]: unknown };

function asNumber(v: unknown) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}
function asString(v: unknown) {
    if (v == null) return "";
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
    return "";
}

export default function ProductDetails() {
    const { brand, id } = useParams<{ brand: string; id: string }>();
    const { dispatch } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!brand || !id) return;
        setLoading(true);
        fetch(`https://toysrmac-backend.onrender.com/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data) setProduct(data as Product);
                else setError("Producto no encontrado");
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [brand, id]);

    if (loading) return <div className="pd">Loading...</div>;
    if (error || !product) return <div className="notfound">{error ?? "Producto no encontrado"}</div>;

    return (
        <section className="pd">
            <div className="pd-left" />
            <div className="pd-right">
                <h1>{product.title ?? asString(product.NAME) ?? asString(product.name)}</h1>
                {asString(product.YEAR) && <p className="pd-year">Año: {asString(product.YEAR)}</p>}
                <p className="pd-price">${asNumber(product.price ?? product.VALUE ?? 0).toFixed(2)}</p>
                <p>{product.desc ?? asString(product.DESC) ?? asString(product.NAME)}</p>
                <div className="pd-actions">
                    <button onClick={() => dispatch({ type: "add", product: { id: String(asString(product.ID ?? product.id)), brand: String(brand ?? ''), title: product.title ?? asString(product.NAME) ?? asString(product.name), price: asNumber(product.price ?? product.VALUE ?? 0) } })}>Agregar al carrito</button>
                </div>
            </div>
        </section>
    );
}

