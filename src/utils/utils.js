const generateDateLocale = () => {
  const dateUTC = new Date(Date.now());
  const dateCustom = { day: "2-digit", month: "2-digit", year: "numeric" };
  return dateUTC.toLocaleDateString(undefined, dateCustom);
};

module.exports = {
  generateDateLocale,
};
