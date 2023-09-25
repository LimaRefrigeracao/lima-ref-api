const  { Pool } = require('pg') 
require("dotenv").config() 

const connection = new Pool({
  connectionString:
    `${process.env.DATABASE_URL}`,
}) 

module.exports = connection 
