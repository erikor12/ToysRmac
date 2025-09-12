import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}

export default NavBar;