const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController')

router.get('/', clientsController.getAll);

router.get("/search", clientsController.search);

router.post('/', clientsController.addClient);
router.post('/login', clientsController.login);

module.exports = router;
