const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProductos() {
  const productos = await prisma.producto.findMany();
  return productos;
}

async function getProductoById(ID) {
  const producto = await prisma.producto.findUnique({
    where: { id: parseInt(ID) },
  });
  return producto;
}

async function searchProductos(NAME) {
  const productos = await prisma.producto.findMany({
    where: {
      nombre: {
        contains: NAME,
        mode: 'insensitive',
      },
    },
  });
  return productos;
}

async function addProduct(NAME, VALUE) {
  const producto = await prisma.producto.create({
    data: {
      nombre: NAME,
      precio: VALUE,
      activo: true,
    },
  });
  return producto;
}

async function updateProduct(ID, NAME, VALUE) {
  const producto = await prisma.producto.update({
    where: { id: ID },
    data: {
      nombre: NAME,
      precio: VALUE,
    },
  });
  return { mensaje: "Producto actualizado" };
}

module.exports = { getProductos, addProduct, updateProduct, getProductoById, searchProductos };