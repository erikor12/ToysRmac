import { Link } from "react-router-dom";

function Home() {
    return (
        <>
        <div>
            <h1>Welcome to ToysRmac!</h1>
            <p>Your one-stop shop for all things toys.</p>
        </div>
        <nav>
            <Link to="/bktoys">Burger King Toys</Link>
            <Link to="/mctoys">McDonald's Toys</Link>
        </nav>
        </>
    );
}

export default Home;
