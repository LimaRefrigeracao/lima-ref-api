const connection = require("./connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async () => {
  const connect = await connection.connect();
  const users = await connect.query(
    "SELECT id, username, email, admin, signature FROM users"
  );
  connect.release();
  return users.rows;
};
const getSignature = async (id) => {
  const connect = await connection.connect();
  const users = await connect.query(
    `SELECT signature FROM users WHERE id = ${id}`
  );
  connect.release();
  return users.rows[0].signature;
};

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
  const { username, email, passwordHash, admin, signature } = request;

  const query =
    "INSERT INTO users (username, email, password, admin, signature) VALUES ($1, $2, $3, $4, $5)";

  const values = [username, email, passwordHash, admin, signature];

  const connect = await connection.connect();
  const register = await connect.query(query, values);
  connect.release();

  return register.rows;
};

const login = async (request) => {
  const { username, password } = request;
  const query = "SELECT * FROM users WHERE username = $1";

  const value = [username];
  const connect = await connection.connect();
  const user = await connect.query(query, value);

  connect.release();

  if (!user.rows[0]) {
    return false;
  }
  const checkPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!checkPassword) {
    return false;
  }

  return user.rows[0];
};

const signToken = async (remember, user) => {
  let expiration = "";

  if (remember == true) {
    expiration = "6d";
  } else {
    expiration = "1d";
  }

  const secret = process.env.SECRET;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      admin: user.admin
    },
    secret,
    { expiresIn: expiration }
  );
  const decoded = jwt.decode(token);
  return { token: token, userData: decoded };
};

const verifyRemoveUser = async (id) => {
  const connect = await connection.connect();
  const users = await connect.query(
    `SELECT id, username, admin FROM users WHERE id = ${id}`
  );
  connect.release();
  return users.rows;
};


const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query("DELETE FROM users WHERE id = $1", [
    id,
  ]);
  connect.release();
  return removed.rowCount;
};

module.exports = {
  getSignature,
  getAll,
  checkUsersExists,
  register,
  login,
  signToken,
  verifyRemoveUser,
  remove,
};
