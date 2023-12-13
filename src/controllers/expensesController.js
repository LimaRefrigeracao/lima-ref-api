const expensesModel = require("../models/expensesModel");
const utilities = require("../utils/utils")

const getAll = async (_req, res) => {
  const expenses = await expensesModel.getAll();
  return res.status(200).json(expenses);
};

const create = async (req, res) => {
  const dateFormated = utilities.formatDate(req.body.date);
  req.body.date = dateFormated;
  const expenses = await expensesModel.create(req.body);
  return res.status(201).json(expenses);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await expensesModel.remove(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  remove
}