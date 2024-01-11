const connection = require("./connection");

const getAll = async () => {
  const connect = await connection.connect();
  const employees = await connect.query("SELECT * FROM employees");
  connect.release();
  return employees.rows;
};

const create = async (employee) => {
  const { full_name, address, cpf, entry_date, payment_type, payment_value, total_salary, pix_key, vouchers } = employee;
  const query =
    "INSERT INTO employees (full_name, address, cpf, entry_date, payment_type, payment_value, total_salary, pix_key, vouchers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  const values = [full_name, address, cpf, entry_date, payment_type, payment_value, total_salary, pix_key, vouchers];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

const update = async (id, request) => {
  const { full_name, address, cpf, entry_date, payment_type, payment_value, total_salary, pix_key, vouchers } = request;

  const query =
    "UPDATE employees SET full_name = $1, address = $2, cpf = $3, entry_date = $4, payment_type = $5, payment_value = $6, total_salary = $7, pix_key = $8, vouchers = $9 WHERE id = $10";

  const values = [full_name, address, cpf, entry_date, payment_type, payment_value, total_salary, pix_key, vouchers, id];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();
  return updated.rowCount;
};


const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query(
    "DELETE FROM employees WHERE id = $1",
    [id]
  );
  connect.release();
  return removed.rowCount;
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
