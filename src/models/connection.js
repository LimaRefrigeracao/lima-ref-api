const  { Pool } = require('pg');
require("dotenv").config();

const connection = new Pool({
  connectionString:
    `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`,
});

module.exports = connection;
