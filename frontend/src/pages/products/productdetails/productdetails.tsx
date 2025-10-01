import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../../../contexts/cartcontext";
import "../productdetails/productdetails.css";

type Product = {
    id: number | string;
    name: string;
    price: number;
};

function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state as Product | undefined;
    const { addToCart } = useCart();

    if (!product) {
        return (
            <div className="productContent" >
                <h1>Product Detail: {id}</h1>
                <p>No product data available. Please navigate from the product list.</p>
            </div>
        );
    }

    return (
        <div className="productContent" >
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}
export default ProductDetail;