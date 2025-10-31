type Product = { id: string; title: string; price: number; short?: string };

export default function ProductCard({ product, onDetails, onAdd }: Readonly<{ product: Product; onDetails: (p: Product) => void; onAdd: (p: Product) => void }>) {
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

