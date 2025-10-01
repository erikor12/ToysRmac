import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cartcontext";
import "../navbar/navbar.css";

function NavBar() {
    const { totalItems } = useCart();
    return (
        <nav className="Nav">
            <Link to="/" className="links">Home</Link>
            <Link to="/about" className="links">About</Link>
            <Link to="/cart" className="links">Carrito ({totalItems})</Link>
        </nav>
    );
}

export default NavBar;