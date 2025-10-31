import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cartcontext";
import { useAuth } from "../../contexts/authcontext";
import "./checkout.css";
import PurchaseModal from "../../components/purchaseModal/PurchaseModal";
import { useState } from "react";

export default function Checkout() {
    const { state, dispatch } = useCart();
    const { state: authState } = useAuth();
    const navigate = useNavigate();
    const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

    const [open, setOpen] = useState(false);

    function handleConfirm() {
        // Verificar sesin
        if (!authState.user) {
            alert('Debes iniciar sesi\u00f3n para completar la compra.');
            navigate('/login');
            return;
        }

        if (state.items.length === 0) {
            alert('El carrito est\u00e1 vac\u00edo.');
            return;
        }

        // Construir resumen detallado
    // Abrir modal con resumen
        setOpen(true);
    }

    function onModalClose(confirmed?: boolean) {
        setOpen(false);
        if (confirmed) {
            // Vaciar carrito y redirigir
            dispatch({ type: "clear" });
            navigate("/", { replace: true });
        }
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
                    {!authState.user && <div style={{ color: 'crimson', marginBottom: 8 }}>Debes iniciar sesión para poder comprar. <button onClick={() => navigate('/login')} style={{ marginLeft: 8 }}>Iniciar sesión</button></div>}
                    <button onClick={handleConfirm} disabled={state.items.length === 0 || !authState.user}>Confirmar compra</button>
                </div>
            </div>
            <PurchaseModal open={open} onClose={onModalClose} lines={state.items.map(it => `${it.title} x ${it.qty} - $${(it.price * it.qty).toFixed(2)}`)} total={total} />
        </main>
    );
}

