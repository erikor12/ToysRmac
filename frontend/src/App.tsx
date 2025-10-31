import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Cart from "./components/Cart/cart";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import McToys from "./pages/products/mctoys/mctoys";
import BKToys from "./pages/products/bktoys/bktoys";
import ProductDetails from "./pages/products/productdetails/productdetails";
import NotFound from "./pages/notfound/notfound";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import Checkout from "./pages/checkout/checkout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/profile/Profile";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mctoys" element={<McToys />} />
          <Route path="/bktoys" element={<BKToys />} />
          <Route path="/product/:brand/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Cart />
    </>
  );
}

