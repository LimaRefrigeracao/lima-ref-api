const connection = require("./connection");

const getAll = async () => {
  const [services] = await connection.execute("SELECT * FROM services WHERE warehouse_status = false");
  return services;
};

const create = async (service) => {
  const { product, client, telephone, adress, status, observation } = service;

  const dateUTC = new Date(Date.now());
  const dateCustom = { day: "2-digit", month: "2-digit", year: "numeric" };
  const created_at = dateUTC.toLocaleDateString(undefined, dateCustom);

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
  
  const dateUTC = new Date(Date.now());
  const dateCustom = { day: "2-digit", month: "2-digit", year: "numeric" };
  const updated_at = dateUTC.toLocaleDateString(undefined, dateCustom);

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
