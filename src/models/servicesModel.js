const connection = require("./connection");
const utilities = require("../utils/utils.js");
const orders = require("./orderOfServiceModel");

const getAll = async () => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT * FROM services WHERE warehouse_status = false"
  );
  connect.release();
  return services.rows;
};

const create = async (service) => {
  const { product, client, telephone, adress, status, observation } = service;

  const created_at = utilities.generateDateLocale();
  const order_of_service = utilities.generateUuid();

  const query =
    "INSERT INTO services(product, client, telephone, adress, status, payment_status, order_of_service, observation, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  const values = [
    product,
    client,
    telephone,
    adress,
    status,
    0,
    order_of_service,
    observation,
    created_at,
  ];

  const connect = await connection.connect();
  const created = await connect.query(query, values);
  connect.release();

  if (created.rowCount) {
    await orders.create(order_of_service, created_at);
  }
  
  return created.rowCount;
};

const update = async (id, service) => {
  const {
    product,
    client,
    telephone,
    adress,
    status,
    payment_status,
    observation,
  } = service;

  const updated_at = utilities.generateDateLocale();

  const query =
    "UPDATE services SET product = $1, client = $2, telephone = $3, adress = $4, status = $5, payment_status = $6, observation = $7, updated_at = $8 WHERE id = $9";

  const values = [
    product,
    client,
    telephone,
    adress,
    status,
    payment_status,
    observation,
    updated_at,
    id,
  ];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();

  return updated.rowCount;
};

const remove = async (id) => {
  const connect = await connection.connect();
  const removed = await connect.query("DELETE FROM services WHERE id = $1", [
    id,
  ]);
  connect.release();
  return removed.rowCount;
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
