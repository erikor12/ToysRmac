import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cartcontext";
import { useAuth } from "../../contexts/authcontext";
import "./checkout.css";

export default function Checkout() {
    const { state, dispatch } = useCart();
    const { state: authState } = useAuth();
    const navigate = useNavigate();
    const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

    function handleConfirm() {
        // Simula confirmación
        alert(`Gracias ${authState.user?.name}. Compra realizada por $${total.toFixed(2)}`);
        dispatch({ type: "clear" });
        navigate("/", { replace: true });
    }

    return (
        <main className="checkout-page">
            <div className="checkout-card">
                <h1>Checkout</h1>
                <p>Usuario: <strong>{authState.user?.name}</strong></p>
                <ul>
                    {state.items.map(it => (
                        <li key={it.id}>{it.title} x {it.qty} — ${(it.price * it.qty).toFixed(2)}</li>
                    ))}
                </ul>
                <div className="checkout-total">Total: <strong>${total.toFixed(2)}</strong></div>
                <div className="checkout-actions">
                    <button onClick={handleConfirm} disabled={state.items.length === 0}>Confirmar compra</button>
                </div>
            </div>
        </main>
    );
}

