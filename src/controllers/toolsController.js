const toolsModel = require("../models/toolsModel");

const getNotifications = async (_req, res) => {
  const notification = await toolsModel.getNotifications();
  return res.status(200).json(notification);
};

module.exports = {
  getNotifications,
};
