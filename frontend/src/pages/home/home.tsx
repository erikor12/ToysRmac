import { Link } from "react-router-dom";
import "../home/home.css";

function Home() {
    return (
        <div className="paddingTop">
            <div className="homeContent">
                <h1 className="homeh1">Welcome to ToysRmac!</h1>
                <p className="homep">Your one-stop shop for all things toys.</p>
                <nav>
                    <Link className="homebk" to="/bktoys">Burger King Toys</Link>
                    <Link className="homemc" to="/mctoys">McDonald's Toys</Link>
                </nav>
            </div>
        </div>
    );
}

export default Home;
