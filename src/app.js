const express = require('express');
const router = require('./router');

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(router);

module.exports = app;