const fs = require("fs") 
require("dotenv").config() 

module.exports = {
  development: {
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    url: `${process.env.DATABASE_URL}`,
  },
  production: {
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    username: "limaref_26w1_user",
    password: "TOYnABMXqIGQuySmzwUFgw4kDNW03Ywg",
    database: "limaref_26w1",
    host: "dpg-ck8knmnsasqs739mdp9g-a",
    port: 5432,
  },
}; 
