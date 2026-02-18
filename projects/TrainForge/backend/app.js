require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { apiLimiter } = require('./middlewares/rateLimit.middleware');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');
const apiRoutes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'TrainForge API', version: 'v1' });
});

app.use('/api/v1', apiLimiter, apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
