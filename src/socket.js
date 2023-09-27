const { io } = require("./app");

io.on("connection", socket => {
  console.log("Websocket Conectado");
});