const connection = require("./connection");
const moment = require("moment");

const getNotifications = async () => {
  const connect = await connection.connect();
  const services = await connect.query(
    "SELECT * FROM services WHERE warehouse_status = false AND status <> 13 ORDER BY created_at DESC"
  );
  connect.release();
  const result = services.rows;

  const currentDate = moment();
  const filteredResult = result.filter((service) => {
    const createdAt = moment(service.created_at);
    const daysDifference = currentDate.diff(createdAt, "days");
    return daysDifference > 5;
  });

  const resultWithDays = filteredResult.map((service) => {
    const createdAt = moment(service.created_at);
    const days = currentDate.diff(createdAt, "days");
    return {
      ...service,
      days,
    };
  });

  return resultWithDays;
};

module.exports = {
  getNotifications,
};
