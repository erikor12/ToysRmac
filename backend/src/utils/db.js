const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Prisma client created; attempting initial connect...');
prisma
	.$connect()
	.then(() => console.log('Prisma initial connect succeeded'))
	.catch((err) => console.error('Prisma initial connect failed:', err && err.message ? err.message : err));

module.exports = prisma;
