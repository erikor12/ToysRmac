const express = require('express');
const cors = require('cors')

//importar el router
const productosRouter = require('./src/routes/productosRoutes')

//creo instancia de express 
const app = express();

//middlewares para que express entienda json
app.use(express.json());

//habilitar cors PARA TODAS LAS RUTAS
app.use(cors())

app.use('/productos', productosRouter)

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});