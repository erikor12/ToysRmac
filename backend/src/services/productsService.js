const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProductos() {
  const productos = await prisma.products.findMany();
  return productos;
}

async function searchProductos(NAME) {
  const productos = await prisma.products.findMany({
    where: {
      NAME: {
        contains: NAME,
        mode: 'insensitive',
      },
    },
  });
  return productos;
}

async function getMC() {
  const productos = await prisma.products.findMany({
    where: {
      STORE: {
        contains: 'MC',
        mode: 'insensitive',
      },
    },
  });
  return productos;
}

async function getBK() {
  const productos = await prisma.products.findMany({
    where: {
      STORE: {
        contains: 'BK',
        mode: 'insensitive',
      },
    },
  });
  return productos;
}

module.exports = { getProductos, searchProductos, getMC, getBK };