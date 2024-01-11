const validateCreate = (req, res, next) => {
  const { body } = req

  if (typeof body.full_name === "undefined" || body.full_name === "") {
    res.status(400).json({ msg: 'Campo "Nome Completo" é obrigatório.' })
  }
  if (typeof body.address === "undefined" || body.address === "") {
    res.status(400).json({ msg: 'Campo "Endereço" é obrigatório.' });
  }
  if (typeof body.cpf === "undefined" || body.cpf === "") {
    res.status(400).json({ msg: 'Campo "CPF" é obrigatório.' })
  }
  if (typeof body.entry_date === "undefined" || body.entry_date === "") {
    res.status(400).json({ msg: 'Campo "Data de Entrada" é obrigatório.' })
  }
  if (typeof body.payment_type === "undefined" || body.payment_type === "") {
    res.status(400).json({ msg: 'Campo "Tipo de Pagamento" é obrigatório.' });
  }
  if (typeof body.payment_value === "undefined" || body.payment_value === "") {
    res.status(400).json({ msg: 'Campo "Valor de Pagamento" é obrigatório.' })
  }
  if (typeof body.total_salary === "undefined" || body.total_salary === "") {
    res.status(400).json({ msg: 'Campo "Salário Total" é obrigatório.' })
  }

  next()
}

module.exports = {
  validateCreate,
} 
