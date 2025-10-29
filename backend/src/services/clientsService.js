const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

module.exports = { getClients, searchClients };