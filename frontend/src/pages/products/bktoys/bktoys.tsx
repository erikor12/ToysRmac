import { Link } from "react-router-dom";
import "../bktoys/bktoys.css";

function BKToysPage() {
    const productos = [
        { id: 1, name: "bk1", price: 100 },
        { id: 2, name: "bk2", price: 200 }
    ];
    return (
        <>
            <div className="homeContent">
                <h1>Welcome to the Burger King Page</h1>
                <div className="homeLinks">
                    {
                        productos.map(producto => (
                            <div key={producto.id}>
                                <Link to={`/productos/${producto.id}`} state={producto}>
                                    <h2>{producto.name}</h2>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default BKToysPage;
