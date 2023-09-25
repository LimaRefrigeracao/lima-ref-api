require("dotenv").config() 

const express = require("express") 
const router = require("./router") 

const app = express() 

app.use(express.json()) 
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN) 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE") 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Content-Type, Accept"
  ); 
  next() 
}) 
app.use(router) 

module.exports = app 
