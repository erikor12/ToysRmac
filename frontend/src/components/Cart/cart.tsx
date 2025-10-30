import "./cart.css";
import { useCart } from "../../contexts/cartcontext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { state, dispatch } = useCart();
    const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    const navigate = useNavigate();
    <button className="checkout" onClick={() => navigate("/checkout")}>Checkout</button>

    if (!state.drawerOpen) return null; // no render si está cerrado

    return (
        <>
            <div className="cart-overlay" onClick={() => dispatch({ type: "close" })} />
            <aside className="cart-drawer open" role="dialog" aria-modal="true">
                <div className="cart-head">
                    <h3>Carrito</h3>
                    <div className="cart-head-actions">
                        <button className="btn-link" onClick={() => dispatch({ type: "clear" })}>Vaciar</button>
                        <button className="btn-close" onClick={() => dispatch({ type: "close" })}>×</button>
                    </div>
                </div>

                {state.items.length === 0 ? (
                    <div className="cart-empty">
                        <p>No hay artículos en el carrito.</p>
                        <Link to="/" className="cart-cta" onClick={() => dispatch({ type: "close" })}>Ir a tienda</Link>
                    </div>
                ) : (
                    <>
                        <ul className="cart-list">
                            {state.items.map((it) => (
                                <li key={it.id} className="cart-item">
                                    <div className="item-thumb" style={{ backgroundImage: `url(${it.img ?? "/src/assets/placeholder.png"})` }} />
                                    <div className="item-body">
                                        <div className="item-title">{it.title}</div>
                                        <div className="item-meta">
                                            <span className="item-brand">{it.brand === "mctoys" ? "McToys" : "BK Toys"}</span>
                                            <span className="item-price">${it.price.toFixed(2)}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => dispatch({ type: "dec", id: it.id })} className="qty-btn">-</button>
                                            <span className="qty">{it.qty}</span>
                                            <button onClick={() => dispatch({ type: "add", product: { id: it.id, brand: it.brand, title: it.title, price: it.price } })} className="qty-btn">+</button>
                                            <button onClick={() => dispatch({ type: "remove", id: it.id })} className="remove">Quitar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total</span>
                                <strong>${total.toFixed(2)}</strong>
                            </div>
                            <div className="cart-actions">
                                <button className="checkout" onClick={() => { /* integrar checkout */ }}>Checkout</button>
                                <Link to="/mctoys" className="continue" onClick={() => dispatch({ type: "close" })}>Seguir comprando</Link>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}

