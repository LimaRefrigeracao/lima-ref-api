const orderOfServiceModel = require("../models/orderOfServiceModel");

const getUnique = async (req, res) => {
  const { cod } = req.params;
  const order_of_service = await orderOfServiceModel.getUnique(cod);
  return res.status(200).json(order_of_service);
};

const updateEstimate = async (req, res) => {
  const { cod } = req.params;
  const getOrderValue = await orderOfServiceModel.getUnique(cod);
  let id = null;
  let estimateArray = null;
  estimateArray = JSON.parse(getOrderValue[0].estimate) || [];
  if (estimateArray.length > 0) {
    id = estimateArray.length + 1;
  } else {
    id = 1;
  }
  const newRecord = {
    id: id,
    amount: req.body.amount,
    description: req.body.description,
    price: req.body.price,
  };
  estimateArray.push(newRecord);
  estimateArray = JSON.stringify(estimateArray);
  const order_of_service = await orderOfServiceModel.updateEstimate(
    estimateArray,
    cod
  );
  return res.status(200).json(order_of_service);
};

const removeEstimate = async (req, res) => {
  const { cod, idEstimate } = req.params;
  await orderOfServiceModel.removeEstimate(cod, idEstimate);
  return res.status(204).json();
};


module.exports = {
  getUnique,
  updateEstimate,
  removeEstimate,
};
