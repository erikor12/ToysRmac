const productService = require('../services/productsService')

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
        const { NAME } = req.query;
        const data = await productService.searchProductos(NAME)
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function getMC(req, res) {
    try {
        const data = await productService.getMC()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function getBK(req, res) {
    try {
        const data = await productService.getBK()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = { getAll, search, getMC, getBK }