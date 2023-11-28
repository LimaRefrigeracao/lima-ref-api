const orderOfServiceModel = require("../models/orderOfServiceModel");
const utilities = require("../utils/utils.js");

const getAll = async (req, res) => {
  const order_of_service = await orderOfServiceModel.getAll();
  return res.status(200).json(order_of_service);
};

const getUnique = async (req, res) => {
  const { cod } = req.params;
  const order_of_service = await orderOfServiceModel.getUnique(cod);
  return res.status(200).json(order_of_service);
};

const updateEstimate = async (req, res) => {
  const { cod } = req.params;
  if (req.body.type == "completa") {
    const getOrderValue = await orderOfServiceModel.getUnique(cod);
    const id = utilities.generateUuid();
    let estimateArray = null;
    let totalPrice = 0;

    estimateArray = JSON.parse(getOrderValue[0].estimate) || [];
    const newRecord = {
      id: id,
      amount: req.body.amount,
      description: req.body.description,
      price: req.body.price,
    };
    estimateArray.push(newRecord);
    for (const record of estimateArray) {
      totalPrice += record.price;
    }
    estimateArray = JSON.stringify(estimateArray);
    const order_of_service = await orderOfServiceModel.updateEstimate(
      estimateArray,
      totalPrice,
      cod
    );
    return res.status(200).json(order_of_service);
  } else {
    const remove_estimate_simple =
      await orderOfServiceModel.removeEstimateSimple(cod, req.body.id);

    if (remove_estimate_simple) {
      const getOrderValue = await orderOfServiceModel.getUnique(cod);
      const id = utilities.generateUuid();
      let estimateArray = null;
      let totalPrice = 0;

      estimateArray = JSON.parse(getOrderValue[0].estimate) || [];
      const newRecord = {
        id: id,
        amount: req.body.amount,
        description: req.body.description,
        price: req.body.price,
      };
      estimateArray.push(newRecord);
      for (const record of estimateArray) {
        totalPrice += record.price;
      }
      estimateArray = JSON.stringify(estimateArray);
      const order_of_service = await orderOfServiceModel.updateEstimate(
        estimateArray,
        totalPrice,
        cod
      );
      return res.status(200).json(order_of_service);
    }
    return res.status(433).json();
  }
};

const removeEstimate = async (req, res) => {
  const { cod, idEstimate } = req.params;
  const order_of_service = await orderOfServiceModel.removeEstimate(
    cod,
    idEstimate
  );
  return res.status(204).json(order_of_service);
};

module.exports = {
  getAll,
  getUnique,
  updateEstimate,
  removeEstimate,
};
