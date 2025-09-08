import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar'
import Home from './pages/home'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductDetail />} /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
