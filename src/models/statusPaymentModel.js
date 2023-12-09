const connection = require("./connection");

const getAll = async () => {
  const connect = await connection.connect();
  const status_payment = await connect.query("SELECT * FROM status_payment");
  connect.release();
  return status_payment.rows;
};

const getUniqueStatus = async (description) => {
  const connect = await connection.connect();
  const status_payment = await connect.query("SELECT cod FROM status_payment WHERE description = $1", [description]);
  connect.release();
  return status_payment.rows;
};

const create = async (status_payment) => {
  const { description, cod, color } = status_payment;
  const query =
    "INSERT INTO status_payment (description, cod, color) VALUES ($1, $2, $3)";

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
    "DELETE FROM status_payment WHERE id = $1",
    [id]
  );
  connect.release();
  return removed.rowCount;
};

module.exports = {
  getAll,
  getUniqueStatus,
  create,
  remove,
};
