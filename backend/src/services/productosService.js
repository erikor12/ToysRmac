// # consultas SQL puras

const { sql, pool, conectar } = require('../db/connection')

async function getProductos() {
  const pool = await conectar(); // siempre obtenés el pool
  const result = await pool.request().query("SELECT * FROM Productos");
  return result.recordset;
}

async function getProductoById(id) {
  const pool = await conectar();
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Productos WHERE Id = @id");
  return result.recordset;
}

async function searchProductos(nombre) {
  const pool = await conectar();
  const result = await pool.request()
  .input("nombre", sql.VarChar, `%${nombre}%`)
  .query("SELECT Id, Nombre, Precio FROM Productos WHERE Nombre LIKE @nombre");
    return result.recordset;
}

async function addProduct(nombre, precio) {
  const pool = await conectar();
  const result = pool.request().input("Nombre", sql.VarChar, nombre)
    .input("Precio", sql.Decimal(10, 2), precio)
    .input("Activo", sql.Bit, true)
    .query("INSERT INTO Productos (Nombre, Precio, Activo) VALUES (@Nombre, @Precio, @Activo)")
  return result.rowsAffected;
}

async function updateProduct(id, nombre, precio) {
  const pool = await conectar();
  const result = pool.request()
    .input("id", sql.Int, id)
    .input("nombre", sql.VarChar, nombre)
    .input("precio", sql.Decimal(10, 2), precio)
    .query("UPDATE Productos SET Nombre = @nombre, Precio = @precio WHERE Id = @id");
  return { mensaje: "Producto actualizado" };
}

module.exports = { getProductos, addProduct, updateProduct, getProductoById,searchProductos }