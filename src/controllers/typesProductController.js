const typesProductModel = require("../models/typesProductModel");

const getAll = async (_req, res) => {
  const types_product = await typesProductModel.getAll();
  return res.status(200).json(types_product);
};

const create = async (req, res) => {
  const types_product = await typesProductModel.create(req.body);
  return res.status(201).json(types_product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await typesProductModel.remove(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  remove
}