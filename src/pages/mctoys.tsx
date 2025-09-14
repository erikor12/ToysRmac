import { Link } from "react-router-dom";

function MCToysPage() {
    const productos = [
        { id: 1, name: "mc1", price: 100 },
        { id: 2, name: "mc2", price: 200 }
    ];
    return (
        <>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the McDonalds Page</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
