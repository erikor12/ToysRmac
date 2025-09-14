import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar'
import Home from './pages/home'
import AboutPage from './pages/about'
import NotFoundPage from './pages/notfound'
import BKToysPage from './pages/bktoys'
import MCToysPage from './pages/mctoys'
import Cart from './components/Cart/cart'
import ProductDetail from './pages/productdetails'

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
