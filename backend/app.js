require('dotenv').config();
const express = require('express');
const cors = require('cors');

// importar el router
const productsRouter = require('./src/routes/productsRoutes');
const clientsRouter = require('./src/routes/clientsRoutes');
const prisma = require('./src/utils/db');

// creo instancia de express 
const app = express();

// middlewares para que express entienda json
app.use(express.json());

// habilitar cors PARA TODAS LAS RUTAS
app.use(cors());

app.use('/products', productsRouter);
app.use('/clients', clientsRouter);

// health endpoint to check server + database connectivity
app.get('/health', async (req, res) => {
  try {
    // a lightweight db check
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ ok: true, db: 'ok' });
  } catch (err) {
    console.error('Health check DB error:', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, db: 'error', message: err && err.message ? err.message : String(err) });
  }
});

// error handling middleware (log stack and return generic message)
app.use((err, req, res, next) => {
  console.error('Unhandled error in request:', err && err.stack ? err.stack : err);
  // don't leak stack in production, but provide enough for logs
  res.status(500).json({ error: 'Internal Server Error' });
});

// log unhandled promise rejections / uncaught exceptions so Render logs capture them
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err && err.stack ? err.stack : err);
  // It's safer to exit on uncaught exceptions in many cases; here we just log.
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});