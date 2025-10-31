const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function getClients() {
    const clients = await prisma.clients.findMany();
    return clients;
}

async function searchClients(USER) {
    const clients = await prisma.clients.findMany({
        where: {
            USER: {
                contains: USER,
                mode: 'insensitive',
            },
        },
    });
    return clients;
}

async function addClient(clientData) {
    // Validate presence of clientData and required fields at service level as well
    if (!clientData || typeof clientData.USER !== 'string' || clientData.USER.trim() === '') {
        const err = new Error('USER is required');
        err.statusCode = 400;
        throw err;
    }

    // Hash password before storing
    const saltRounds = 10;
    const hashed = await bcrypt.hash(clientData.PASSWORD, saltRounds);

    // Prepare payload (CREATION handled by Prisma default)
    const payload = {
        USER: clientData.USER,
        MAIL: clientData.MAIL,
        PASSWORD: hashed,
    };

    try {
        const newClient = await prisma.clients.create({
            data: payload
        });
        return newClient;
    } catch (prismaErr) {
        // Re-throw or map Prisma errors to friendly messages (example: unique constraint)
        if (prismaErr.code === 'P2002') {
            const err = new Error('Unique constraint failed. A client with that USER or MAIL may already exist.');
            err.statusCode = 409;
            throw err;
        }
        throw prismaErr;
    }
}

async function authenticate({ MAIL, PASSWORD }) {
    if (!MAIL || !PASSWORD) {
        const err = new Error('MAIL and PASSWORD are required');
        err.statusCode = 400;
        throw err;
    }

    const user = await prisma.clients.findUnique({ where: { MAIL } });
    if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 401;
        throw err;
    }

    const match = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!match) {
        const err = new Error('Invalid credentials');
        err.statusCode = 401;
        throw err;
    }

    // don't return the password hash
    const { PASSWORD: _p, ...safe } = user;
    return safe;
}

module.exports = { getClients, searchClients, addClient, authenticate };