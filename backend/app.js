const express = require('express');
const cors = require('cors');

//importar el router
const productsRouter = require('./src/routes/productsRoutes')
const clientsRouter = require('./src/routes/clientsRoutes')

//creo instancia de express 
const app = express();

//middlewares para que express entienda json
app.use(express.json());

//habilitar cors PARA TODAS LAS RUTAS
app.use(cors())

app.use('/products', productsRouter)
app.use('/clients', clientsRouter)

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});