const connection = require("./connection");
const utilities = require("../utils/utils.js")

const getAll = async () => {
  const [services] = await connection.execute("SELECT * FROM services WHERE warehouse_status = false");
  return services;
};

const create = async (service) => {
  const { product, client, telephone, adress, status, observation } = service;

  const created_at = utilities.generateDateLocale();

  /* Gerar registro no banco de ordens */

  const order_of_service = 1


  const query =
    "INSERT INTO services(product, client, telephone, adress, status, payment_status, observation, created_at, order_of_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [created] = await connection.execute(query, [
    product,
    client,
    telephone,
    adress,
    status,
    0,
    observation,
    created_at,
    order_of_service,
  ]);

  return { insertId: created.insertId };
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
    "UPDATE services SET product = ?, client = ?, telephone = ?, adress = ?, status = ?, payment_status = ?, observation = ?, updated_at = ? WHERE id = ?";

  const [updated] = await connection.execute(query, [
    product,
    client,
    telephone,
    adress,
    status,
    payment_status,
    observation,
    updated_at,
    id,
  ]);

  return updated;
};

const remove = async (id) => {
  const [removed] = await connection.execute(
    "DELETE FROM services WHERE id = ?",
    [id]
  );
  return removed;
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
