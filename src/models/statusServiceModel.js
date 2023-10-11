const connection = require("./connection");

const getAll = async () => {
  const connect = await connection.connect();
  const status_service = await connect.query("SELECT * FROM status_service");
  connect.release();
  return status_service.rows;
};

const create = async (status_service) => {
  const { description, cod, color } = status_service;
  const query =
    "INSERT INTO status_service (description, cod, color) VALUES ($1, $2, $3)";

  const values = [
    description,
    cod,
    color
  ];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query(
    "DELETE FROM status_service WHERE id = $1",
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
