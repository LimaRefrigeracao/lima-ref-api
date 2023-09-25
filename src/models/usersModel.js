const connection = require("./connection");

const checkUsersExists = async (email, username) => {
  const queryEmail = "SELECT * FROM users WHERE email = $1";
  const queryUsername = "SELECT * FROM users WHERE username = $1";

  const valueEmail = [email];
  const valueUsername = [username];

  const connect = await connection.connect();
  const checkEmail = await connect.query(queryEmail, valueEmail);
  const checkUsername = await connect.query(queryUsername, valueUsername);
  connect.release();

  return [checkEmail.rowCount, checkUsername.rowCount];
};

const register = async (request) => {
  const { username, email, passwordHash, remember } = request;
  const query =
    "INSERT INTO users (username, email, password, remember) VALUES ($1, $2, $3, $4)";

  const values = [username, email, passwordHash, remember];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rows;
};

const login = async (request) => {
  const query = "INSERT INTO users(cod_order, created_at) VALUES ($1, $2)";

  const values = [cod_order, created_at];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

module.exports = {
  checkUsersExists,
  register,
  login,
};
