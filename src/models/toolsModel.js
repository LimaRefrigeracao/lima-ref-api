const connection = require("./connection");
const moment = require("moment");
const serviceModel = require("./servicesModel");

const getNotifications = async () => {
  const connect = await connection.connect();
  const services = await serviceModel.getAllNotConcluded();
  connect.release();

  const currentDate = moment();
  const filteredResult = services.filter((service) => {
    const createdAt = moment(service.created_at);
    const daysDifference = currentDate.diff(createdAt, "days");
    return daysDifference >= 7;
  });

  const resultWithDays = filteredResult.map((service) => {
    const createdAt = moment(service.created_at);
    const days = currentDate.diff(createdAt, "days");
    return {
      ...service,
      days,
    };
  });

  const sortedResult = resultWithDays.sort((a, b) => b.days - a.days);

  return sortedResult;
};


module.exports = {
  getNotifications,
};
