import { Link } from "react-router-dom";
import "../mctoys/mctoys.css";
function MCToysPage() {
    const productos = [
        { id: 1, name: "mc1", price: 100 },
        { id: 2, name: "mc2", price: 200 }
    ];
    return (
        <>
            <div id="mc" className="homeContent">
                <h1>Welcome to the McDonalds Page</h1>
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

export default MCToysPage;
