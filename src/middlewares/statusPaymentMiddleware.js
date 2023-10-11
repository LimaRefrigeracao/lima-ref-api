const validateCreate = (req, res, next) => {
  const { body } = req;

  if (typeof body.description === "undefined" || body.description === "") {
    res.status(400).json({ msg: 'Campo "Descrição" é obrigatório.' });
  }
  if (typeof body.cod === "undefined" || body.cod === "") {
    res.status(400).json({ msg: 'Campo "Código" é obrigatório.' });
  }
  if (typeof body.color === "undefined" || body.color === "") {
    res.status(400).json({ msg: 'Campo "Cor" é obrigatório.' });
  }

  next();
};

module.exports = {
  validateCreate
}; 
