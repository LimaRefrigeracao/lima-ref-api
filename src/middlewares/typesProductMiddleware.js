const validateCreate = (req, res, next) => {
  const { body } = req;

  if (typeof body.name === "undefined" || body.name === "") {
    res.status(400).json({ msg: 'Campo "Descrição" é obrigatório.' });
  }

  next();
};

module.exports = {
  validateCreate
}; 
