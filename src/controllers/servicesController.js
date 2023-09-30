const servicesModel = require("../models/servicesModel");

const getAll = async (_req, res) => {
  const services = await servicesModel.getAll();
  return res.status(200).json(services);
};

const getAllWharehouse = async (_req, res) => {
  const services = await servicesModel.getAllWharehouse();
  return res.status(200).json(services);
};

const create = async (req, res) => {
  const created = await servicesModel.create(req.body);
  return res.status(201).json(created);
};

const updateWarehouse = async (req, res) => {
  const { id, value } = req.params;
  const { typeTable } = req.body;
  await servicesModel.updateWarehouse(id, value, typeTable);
  return res.status(204).json();
};

const updateInfoClient = async (req, res) => {
  const { id } = req.params;
  await servicesModel.updateInfoClient(id, req.body);
  return res.status(204).json();
};

const updateStatusService = async (req, res) => {
  const { id, status } = req.params;
  const { typeTable } = req.body;
  await servicesModel.updateStatusService(id, status, typeTable);
  return res.status(204).json();
};

const updateStatusPayment = async (req, res) => {
  const { id, status } = req.params;
  const { typeTable } = req.body;
  await servicesModel.updateStatusPayment(id, status, typeTable);
  return res.status(204).json();
};

const remove = async (req, res) => {
  const { id, cod, typeTable } = req.params;
  await servicesModel.remove(id, cod, typeTable);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getAllWharehouse,
  create,
  updateWarehouse,
  updateInfoClient,
  updateStatusService,
  updateStatusPayment,
  remove,
};
