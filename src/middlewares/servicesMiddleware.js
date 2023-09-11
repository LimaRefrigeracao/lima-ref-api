const validateCreate = (req, res, next) => {
  const { body } = req;

  if (typeof body.product === "undefined" || body.product === "") {
    res.status(400).json({ msg: 'Campo "Produto" é obrigatório.' });
  }
  if (typeof body.client === "undefined" || body.client === "") {
    res.status(400).json({ msg: 'Campo "Cliente" é obrigatório.' });
  }
  if (typeof body.telephone === "undefined" || body.telephone === "") {
    res.status(400).json({ msg: 'Campo "Telefone" é obrigatório.' });
  }
  if (typeof body.adress === "undefined" || body.adress === "") {
    res.status(400).json({ msg: 'Campo "Endereço" é obrigatório.' });
  }

  next();
};

const validateUpdate = (req, res, next) => {
  const { body } = req;

  if (typeof body.product === "undefined" || body.product === "") {
    res.status(400).json({ msg: 'Campo "Produto" é obrigatório.' });
  }
  if (typeof body.client === "undefined" || body.client === "") {
    res.status(400).json({ msg: 'Campo "Cliente" é obrigatório.' });
  }
  if (typeof body.telephone === "undefined" || body.telephone === "") {
    res.status(400).json({ msg: 'Campo "Telefone" é obrigatório.' });
  }
  if (typeof body.adress === "undefined" || body.adress === "") {
    res.status(400).json({ msg: 'Campo "Endereço" é obrigatório.' });
  }
  if (typeof body.status === "undefined" || body.status === "") {
    res.status(400).json({ msg: 'Campo "Situação" é obrigatório.' });
  }
  if (
    typeof body.payment_status === "undefined" ||
    body.payment_status === ""
  ) {
    res.status(400).json({ msg: 'Campo "Situação de Pagamento" é obrigatório.' });
  }

  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
};
