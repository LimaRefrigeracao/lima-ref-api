const connection = require("./connection");
const utilities = require("../utils/utils.js");

const create = async (cod_order, created_at) => {
  const query =
    "INSERT INTO order_of_service(cod_order, created_at) VALUES ($1, $2)";

  const values = [cod_order, created_at];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

module.exports = {
  create,
};
