const connection = require("./connection");

const getAll = async () => {
  const services = await connection.execute("SELECT * FROM services");
  return services;
};

module.exports = {
  getAll,
};
