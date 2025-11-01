require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

/*
  Self-pinger to keep Render from idling:

  - Use the Render-provided external URL if available (RENDER_EXTERNAL_URL).
  - Only enable the pinger when explicitly requested via ENABLE_SELF_PINGER=true
    (so you can disable it in environments where it's not desired).
  - Safe-guard with try/catch and don't let failures crash the process.
*/
const interval = process.env.SELF_PING_INTERVAL_MS ? Number(process.env.SELF_PING_INTERVAL_MS) : 30_000;

// prefer the Render external URL if present; fallback to the configured URL constant
const defaultUrl = process.env.RENDER_EXTERNAL_URL || process.env.EXTERNAL_URL || 'https://toysrmac-backend.onrender.com';
const enablePinger = (process.env.ENABLE_SELF_PINGER || '').toLowerCase() === 'true';

if (enablePinger) {
  console.log(`Self-pinger enabled. Pinging ${defaultUrl} every ${interval}ms`);

  // Reloader Function
  async function reloadWebsite() {
    try {
      const response = await axios.get(`${defaultUrl}/health`, { timeout: 5000 });
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    } catch (error) {
      // log error message but don't throw
      const msg = error && error.message ? error.message : String(error);
      console.error(`Error reloading at ${new Date().toISOString()}:`, msg);
    }
  }

  // Run first ping soon after startup, then at interval
  setTimeout(reloadWebsite, 2000);
  const pinger = setInterval(reloadWebsite, interval);

  // Optional: clear the interval when Node is shutting down
  const gracefulShutdown = () => {
    console.log('Shutting down, clearing self-pinger interval');
    clearInterval(pinger);
    process.exit(0);
  };
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
} else {
  console.log('Self-pinger disabled. To enable set ENABLE_SELF_PINGER=true and (optionally) provide RENDER_EXTERNAL_URL.');
}