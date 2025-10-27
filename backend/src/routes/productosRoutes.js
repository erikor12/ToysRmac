const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController')

// GET → leer todos los productos
router.get('/', productosController.getAll);

router.get("/search", productosController.search);

// GET → leer un producto por id
router.get('/:id', productosController.getById);

// POST → crear un producto nuevo
router.post('/', productosController.create);

// PUT → actualizar un producto
router.put('/:id', productosController.update);

// DELETE → eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Producto ${id} eliminado` });
});

module.exports = router;
