const connection = require("./connection");

const getAll = async () => {
  const connect = await connection.connect();
  const expenses = await connect.query("SELECT * FROM expenses");
  connect.release();
  return expenses.rows;
};

const create = async (request) => {
  const { date, type, description, value } = request;
  const query =
    "INSERT INTO expenses (date, type, description, value) VALUES ($1, $2, $3, $4)";

  const values = [
    date,
    type,
    description,
    value
  ];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query(
    "DELETE FROM expenses WHERE id = $1",
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
