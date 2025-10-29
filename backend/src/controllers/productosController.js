const productService = require('../services/productosService')

async function getAll(req, res) {
    try {
        const data = await productService.getProductos()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function search(req, res) {
    try {
        const { nombre } = req.query;
        const data = await productService.searchProductos(nombre)
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const data = await productService.getProductoById(id)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const { nombre, precio } = req.body;
        await productService.addProduct(nombre, precio)
        res.json({ mensaje: "Producto creado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        await productService.updateProduct(id, nombre, precio)
        res.json({ mensaje: "Producto Editado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAll, create, update, getById, search }