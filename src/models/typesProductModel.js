const connection = require("./connection");

const getAll = async () => {
  const connect = await connection.connect();
  const types_product = await connect.query("SELECT * FROM types_product");
  connect.release();
  return types_product.rows;
};

const create = async (types_product) => {
  const { name } = types_product;
  const query =
    "INSERT INTO types_product (name) VALUES ($1)";

  const values = [name];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query(
    "DELETE FROM types_product WHERE id = $1",
    [id]
  );
  connect.release();
  return removed.rowCount;
};

module.exports = {
  getAll,
  create,
  remove,
};
