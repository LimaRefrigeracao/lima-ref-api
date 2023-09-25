const validateCreate = (req, res, next) => {
  const { body } = req 

  if (typeof body.product === "undefined" || body.product === "") {
    res.status(400).json({ msg: 'Campo "Produto" é obrigatório.' }) 
  }
  if (typeof body.client === "undefined" || body.client === "") {
    res.status(400).json({ msg: 'Campo "Cliente" é obrigatório.' }) 
  }
  if (typeof body.telephone === "undefined" || body.telephone === "") {
    res.status(400).json({ msg: 'Campo "Telefone" é obrigatório.' }) 
  }
  if (typeof body.status === "undefined" || body.status === "") {
    res.status(400).json({ msg: 'Campo "Status" é obrigatório.' }) 
  }

  next() 
} 

const validateUpdateInfoClient = (req, res, next) => {
  const { body } = req 

  if (typeof body.product === "undefined" || body.product === "") {
    res.status(400).json({ msg: 'Campo "Produto" é obrigatório.' }) 
  }
  if (typeof body.client === "undefined" || body.client === "") {
    res.status(400).json({ msg: 'Campo "Cliente" é obrigatório.' }) 
  }
  if (typeof body.telephone === "undefined" || body.telephone === "") {
    res.status(400).json({ msg: 'Campo "Telefone" é obrigatório.' }) 
  }

  next() 
} 

module.exports = {
  validateCreate,
  validateUpdateInfoClient,
} 
