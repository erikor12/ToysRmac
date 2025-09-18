import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/navbar'
import Home from './pages/home/home'
import AboutPage from './pages/about/about'
import NotFoundPage from './pages/notfound/notfound'
import BKToysPage from './pages/products/bktoys/bktoys'
import MCToysPage from './pages/products/mctoys/mctoys'
import Cart from './components/cart/cart'
import ProductDetail from './pages/products/productdetails/productdetails'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bktoys" element={<BKToysPage />} />
        <Route path="/mctoys" element={<MCToysPage />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
