import { useCart } from "../../contexts/cartcontext";

function Cart() {
    const { cart, addToCart, removeFromCart, cleanCart, totalItems, totalPrice } = useCart();

    return (
        <div className="cartpadding">
            <h1>Carrito</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity} = ${ (item.price || 0) * item.quantity }
                        <button onClick={() => removeFromCart(item.id, 1)}>-</button>
                        <button onClick={() => addToCart(item, 1)}>+</button>
                        <button onClick={() => removeFromCart(item.id, item.quantity)}>Eliminar</button>
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