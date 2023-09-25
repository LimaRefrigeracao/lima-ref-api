const connection = require("./connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { username, email, passwordHash } = request;
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3, $4)";

  const values = [username, email, passwordHash];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rows;
};

const login = async (request) => {
  const { username, password, remember } = request;
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

const signToken = async (idUser) => {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: idUser,
      },
      secret
    );

    return token;
};

module.exports = {
  checkUsersExists,
  register,
  login,
  signToken,
};
