const employeesModel = require("../models/employeesModel");

const getAll = async (_req, res) => {
  const employees = await employeesModel.getAll();
  return res.status(200).json(employees);
};


const create = async (req, res) => {
  if (req.body.cpf) {

  }
  if (req.body.entry_date) {

  }

  await employeesModel.create(req.body);
  return res.status(201).json();
};

const update = async (req, res) => {
  const { id } = req.params;
  await employeesModel.update(id, req.body);
  return res.status(201).json();
};

const remove = async (req, res) => {
  const { id } = req.params;
  await employeesModel.remove(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
