const fs = require("fs") 
require("dotenv").config() 

module.exports = {
  development: {
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    url: process.env.DATABASE_URL,
  },
  production: {
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    url: process.env.DATABASE_URL,
  },
} 
