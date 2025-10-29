import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./bktoys.css";
import { useCart } from "../../../contexts/cartcontext";

type Product = {
    id: string | number;
    title?: string;
    price?: number;
    img?: string;
    desc?: string;
    [key: string]: any;
};

export default function BKToys() {
    const { dispatch } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/products/bk")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) setProducts(data);
                else if (data && Array.isArray(data.products)) setProducts(data.products);
                else setError("Unexpected response format from /products/bk");
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="brand-page">
            <h2>Burger King Toys Collection</h2>
            <p className="brand-lead">Figuras y coleccionables de Burger King, seleccionadas para exhibición y juego.</p>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <div className="grid">
                {!loading && !error && products.length === 0 && <p>No products found.</p>}

                {products.map((p) => (
                    <article key={p.id} className="card">
                        <div
                            className="thumb"
                            style={{ backgroundImage: `url(${p.img ?? "/src/assets/placeholder.png"})` }}
                            aria-hidden
                        />
                        <h3>{p.title ?? p.NAME ?? p.name}</h3>
                        <p className="price">${(p.price ?? p.VALUE ?? 0).toString()}</p>
                        <p className="card-desc">{p.desc ?? p.DESCRIPTION ?? p.NAME}</p>
                        <div className="actions">
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "add",
                                        product: { id: String(p.id), brand: "bktoys", title: p.title ?? p.NAME ?? p.name, price: p.price ?? p.VALUE ?? 0 },
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

