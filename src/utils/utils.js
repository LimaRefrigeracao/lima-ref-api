const generateDateLocale = () => {
  const dateUTC = new Date(Date.now())
  const year = dateUTC.getFullYear()
  const month = String(dateUTC.getMonth() + 1).padStart(2, "0")
  const day = String(dateUTC.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const formatDate = (dateISO8601) => {
  const date = new Date(dateISO8601);
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate() + 1).padStart(2, "0");
  const dateFormated = `${ano}-${mes}-${dia}`;
  return dateFormated
}

const generateUuid = () => {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();
  return uuid;
};

module.exports = {
  formatDate,
  generateDateLocale,
  generateUuid,
}; 
