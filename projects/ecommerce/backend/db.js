const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'ecommerce_db',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
