const statusServiceModel = require("../models/statusServiceModel");

const getAll = async (_req, res) => {
  const status_service = await statusServiceModel.getAll();
  return res.status(200).json(status_service);
};

const create = async (req, res) => {
  const status_service = await statusServiceModel.create(req.body);
  return res.status(201).json(status_service);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await statusServiceModel.remove(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  remove
}