import { Link } from "react-router-dom";
import { useCart } from "../contexts/cartcontext";

function NavBar() {
    const { cart } = useCart();
    return (
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Carrito ({cart.length})</Link>
        </nav>
    );
}

export default NavBar;