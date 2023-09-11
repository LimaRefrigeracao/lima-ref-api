const servicesModel = require('../models/servicesModel');

const getAll = async (req, res) => {
  const services = await servicesModel.getAll();
  return res.status(200).json(services);
};

module.exports = {
  getAll,
};
