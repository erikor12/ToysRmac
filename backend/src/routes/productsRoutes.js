const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

router.get('/', productsController.getAll);

router.get("/search", productsController.search);

router.get("/mc", productsController.getMC);

router.get("/bk", productsController.getBK);

router.get('/:id', productsController.getById);

module.exports = router;
