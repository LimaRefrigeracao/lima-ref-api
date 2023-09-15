const generateDateLocale = () => {
  const dateUTC = new Date(Date.now());
  const year = dateUTC.getFullYear();
  const month = String(dateUTC.getMonth() + 1).padStart(2, "0");
  const day = String(dateUTC.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
