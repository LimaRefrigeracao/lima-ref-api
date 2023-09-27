const { server } = require("./app");
require("dotenv").config();
require("./socket");

const PORT = process.env.PORT || 3333;

server.listen(PORT, () =>
  console.log(`Servidor Http em: http://localhost:${PORT}`)
);
