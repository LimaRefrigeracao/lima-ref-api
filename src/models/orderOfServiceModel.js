const connection = require("./connection");
const utilities = require("../utils/utils.js");

const getUnique = async (cod) => {
  const connect = await connection.connect();
  const order_of_service = await connect.query(
    `SELECT * FROM order_of_service WHERE cod_order = ${cod}`
  );
  connect.release();
  return order_of_service.rows;
};

const getCountRows = async (cod) => {
  const connect = await connection.connect();
  const order_of_service = await connect.query(
    `SELECT * FROM order_of_service WHERE cod_order = ${cod}`
  );
  connect.release();
  return order_of_service.rowCount;
};

const create = async (cod_order, created_at) => {
  const query =
    "INSERT INTO order_of_service(cod_order, created_at) VALUES ($1, $2)";

  const values = [cod_order, created_at];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  return created.rowCount;
};

const removeEstimate = async (cod, idEstimate) => {
  const getOrderValue = await orderOfServiceModel.getUnique(cod);
  const estimateArray = JSON.parse(getOrderValue[0].estimate);
  const indexToRemove = idEstimate - 1;
  const newArray = estimateArray.filter(
    (element, index) => index !== indexToRemove
  );
  estimateArray = JSON.stringify(newArray);
  const query =
    "UPDATE order_of_service SET estimate = $1 WHERE cod_order = $2";

  const values = [estimateArray, cod];
  const connect = await connection.connect();
  const removed = await connect.query(query, values);
  connect.release();

  return removed.rowCount;
};

const updateEstimate = async (estimateArray, cod) => {
  const estimate = estimateArray;

  const query =
    "UPDATE order_of_service SET estimate = $1 WHERE cod_order = $2";

  const values = [estimate, cod];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();

  return updated.rowCount;
};

module.exports = {
  getUnique,
  create,
  removeEstimate,
  updateEstimate,
  getCountRows,
};
