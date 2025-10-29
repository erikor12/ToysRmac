const clientsService = require('../services/clientsService')

async function getAll(req, res) {
    try {
        const data = await clientsService.getClients()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function search(req, res) {
    try {
        const { USER } = req.query;
        const data = await clientsService.searchClients(USER)
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAll, search }