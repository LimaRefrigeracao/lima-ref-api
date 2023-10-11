const statusPaymentModel = require("../models/statusPaymentModel");

const getAll = async (_req, res) => {
  const status_payment = await statusPaymentModel.getAll();
  return res.status(200).json(status_payment);
};

const create = async (req, res) => {
  const status_payment = await statusPaymentModel.create(req.body);
  return res.status(201).json(status_payment);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await statusPaymentModel.remove(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  create,
  remove
}