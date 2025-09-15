import { useCart } from "../../contexts/cartcontext";

function Cart() {
    const { cart, removeFromCart, cleanCart, totalItems, totalPrice } = useCart();

    return (
        <div>
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