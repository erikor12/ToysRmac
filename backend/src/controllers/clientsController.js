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

async function addClient(req, res) {
    try {
        // Guard against undefined req.body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is required and must be JSON.' });
        }

        const { USER, MAIL, PASSWORD } = req.body;

        // Basic validation
        if (!USER || typeof USER !== 'string' || USER.trim() === '') {
            return res.status(400).json({ error: 'USER is required and must be a non-empty string.' });
        }
        if (!MAIL || typeof MAIL !== 'string' || MAIL.trim() === '') {
            return res.status(400).json({ error: 'MAIL is required and must be a non-empty string.' });
        }
        if (!PASSWORD || typeof PASSWORD !== 'string' || PASSWORD.trim() === '') {
            return res.status(400).json({ error: 'PASSWORD is required and must be a non-empty string.' });
        }

        const newClient = await clientsService.addClient({
            USER: USER.trim(),
            MAIL: MAIL.trim(),
            PASSWORD: PASSWORD.trim(),
        });

        // remove password field before returning
        const { PASSWORD: _pwd, ...safe } = newClient;
        res.status(201).json(safe);
    } catch (err) {
        // If service attached a statusCode (validation), use it; otherwise 500
        const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
        res.status(status).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is required and must be JSON.' });
        }

        const { MAIL, PASSWORD } = req.body;
        if (!MAIL || !PASSWORD) return res.status(400).json({ error: 'MAIL and PASSWORD are required' });

        const user = await clientsService.authenticate({ MAIL: MAIL.trim(), PASSWORD: PASSWORD.trim() });

        // Store minimal session info if needed on server side; for now return user object
        res.json({ ok: true, user });
    } catch (err) {
        const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
        res.status(status).json({ error: err.message });
    }
}

module.exports = { getAll, search, addClient, login }