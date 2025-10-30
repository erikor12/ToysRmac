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

async function getById(id) {
  // Try to fetch by numeric ID first
  const numericId = Number(id);
  if (!Number.isNaN(numericId)) {
    const producto = await prisma.products.findUnique({
      where: { ID: numericId },
    });
    if (producto) return producto;
  }

  // Fallback: try to find by other unique fields (e.g., NAME) if ID lookup failed
  const producto = await prisma.products.findFirst({
    where: {
      OR: [
        { NAME: { equals: String(id), mode: 'insensitive' } },
      ],
    },
  });

  return producto;
}

module.exports = { getProductos, searchProductos, getMC, getBK, getById };