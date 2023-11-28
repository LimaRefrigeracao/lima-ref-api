const validateUpdateEstimate = (req, res, next) => {
  const { body } = req;

  if (body.type == "simples") {
    if (typeof body.description === "undefined" || body.description === "") {
      res.status(400).json({ msg: 'Campo "Descrição" é obrigatório.' });
    }
    if (typeof body.price === "undefined" || body.price === "") {
      res.status(400).json({ msg: 'Campo "Preço" é obrigatório.' });
    }
  } else {
    if (typeof body.amount === "undefined" || body.amount === "") {
      res.status(400).json({ msg: 'Campo "Quantidade" é obrigatório.' });
    }
    if (typeof body.description === "undefined" || body.description === "") {
      res.status(400).json({ msg: 'Campo "Descrição" é obrigatório.' });
    }
    if (typeof body.price === "undefined" || body.price === "") {
      res.status(400).json({ msg: 'Campo "Preço" é obrigatório.' });
    }
  }

  next();
};

module.exports = {
  validateUpdateEstimate,
};
