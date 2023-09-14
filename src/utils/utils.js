const generateDateLocale = () => {
  const dateUTC = new Date(Date.now());
  const dateCustom = { day: "2-digit", month: "2-digit", year: "numeric" };
  return dateUTC.toLocaleDateString(undefined, dateCustom);
};

const generateUuid = () => {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  const response = parseInt(uuid.replace(/-/g, "").substring(0, 3), 16);
  return response;
};

module.exports = {
  generateDateLocale,
  generateUuid,
};
