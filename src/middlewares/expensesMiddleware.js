const validateCreate = (req, res, next) => {
  const { body } = req;

  if (typeof body.date === "undefined" || body.date === "") {
    res.status(400).json({ msg: 'Campo "Data" é obrigatório.' });
  }
  if (typeof body.type === "undefined" || body.type === "") {
    res.status(400).json({ msg: 'Campo "Tipo" é obrigatório.' });
  }
  if (typeof body.description === "undefined" || body.description === "") {
    res.status(400).json({ msg: 'Campo "Descrição" é obrigatório.' });
  }
  if (typeof body.value === "undefined" || body.value === "") {
    res.status(400).json({ msg: 'Campo "Valor" é obrigatório.' });
  }

  next();
};

module.exports = {
  validateCreate
}; 
