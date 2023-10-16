const connection = require("./connection");
const utilities = require("../utils/utils.js");
const orders = require("./orderOfServiceModel");

const reloadSocketData = async (typeTable) => {
  let data = null;
  if (typeTable == 1) {
    data = await getAll();
  } else if (typeTable == 2) {
    data = await getAllWharehouse();
  }
  const { io } = require("../app");
  io.emit("reloadDataService", data);
  return true;
};

const getAllNotConcluded = async () => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT * FROM services WHERE warehouse_status = false AND status <> 13 ORDER BY id DESC"
  );
  connect.release();
  return services.rows;
};

const getAll = async () => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT * FROM services WHERE warehouse_status = false ORDER BY id DESC"
  );
  connect.release();
  return services.rows;
};

const getAllWharehouse = async () => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT * FROM services WHERE warehouse_status = true ORDER BY created_at_warehouse DESC"
  );
  connect.release();
  return services.rows;
};

const create = async (service) => {
  const {
    product,
    client,
    telephone,
    adress,
    status,
    observation,
    created_at,
    typeTable,
  } = service;

  /* const created_at = utilities.generateDateLocale(); */
  const cod_order = await orders.create(created_at);
  if (cod_order) {
    const query =
      "INSERT INTO services(product, client, telephone, adress, status, payment_status, order_of_service, observation, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

    const values = [
      product,
      client,
      telephone,
      adress,
      status,
      1,
      cod_order,
      observation,
      created_at,
    ];

    const connect = await connection.connect();
    const created = await connect.query(query, values);
    connect.release();

    await reloadSocketData(typeTable);

    return created.rowCount;
  } else {
    return false;
  }
};

const updateWarehouse = async (id, value, typeTable) => {
  const created_at_warehouse = utilities.generateDateLocale();
  let warehouse_status = null;

  if (value === "false") {
    warehouse_status = true;
  } else {
    warehouse_status = false;
  }

  const query =
    "UPDATE services SET warehouse_status = $1, created_at_warehouse = $2 WHERE id = $3";

  const values = [warehouse_status, created_at_warehouse, id];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();
  await reloadSocketData(typeTable);
  return updated.rowCount;
};

const updateInfoClient = async (id, info) => {
  const { product, client, telephone, adress, observation, typeTable } = info;

  const query =
    "UPDATE services SET product = $1, client = $2, telephone = $3, adress = $4, observation = $5 WHERE id = $6";

  const values = [product, client, telephone, adress, observation, id];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();
  await reloadSocketData(typeTable);
  return updated.rowCount;
};

const updateStatusService = async (id, status, typeTable) => {
  const updated_at_service = utilities.generateDateLocale();

  const query =
    "UPDATE services SET status = $1, updated_at_service = $2 WHERE id = $3 RETURNING id, status";

  const values = [status, updated_at_service, id];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();

  await reloadSocketData(typeTable);

  return updated.rowCount;
};

const updateStatusPayment = async (id, status, typeTable) => {
  const updated_at_payment = utilities.generateDateLocale();

  const query =
    "UPDATE services SET payment_status = $1, updated_at_payment = $2 WHERE id = $3";

  const values = [status, updated_at_payment, id];
  const connect = await connection.connect();
  const updated = await connect.query(query, values);
  connect.release();
  await reloadSocketData(typeTable);
  return updated.rowCount;
};

const remove = async (id, cod_order, typeTable) => {
  const connect = await connection.connect();
  const removed = await connect.query("DELETE FROM services WHERE id = $1", [
    id,
  ]);
  connect.release();
  await reloadSocketData(typeTable);
  if (removed.rowCount) {
    orders.remove(cod_order);
  }
  return removed.rowCount;
};

const getCountProductByService = async (data) => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT status.name, COUNT(service.status_id) AS count FROM status LEFT JOIN service ON status.id = service.status_id GROUP BY status.name"
  );
  connect.release();
  return services.rows;
};

module.exports = {
  reloadSocketData,
  getAllNotConcluded,
  getAll,
  getAllWharehouse,
  create,
  updateWarehouse,
  updateInfoClient,
  updateStatusService,
  updateStatusPayment,
  remove,
  getCountProductByService,
};
