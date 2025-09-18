import { useCart } from "../../contexts/cartcontext";
import "../cart/cart.css";

function Cart() {
    const { cart, removeFromCart, cleanCart, totalItems, totalPrice } = useCart();

    return (
        <div className="paddingTop">
            <h1>Carrito</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <div>
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice}</p>
            </div>
            <button onClick={cleanCart}>Vaciar Carrito</button>
        </div>
    );
}

export default Cart;