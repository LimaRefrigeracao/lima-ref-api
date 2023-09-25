const validateRegister = (req, res, next) => {
  const { body } = req 

  if (typeof body.username === "undefined" || body.username === "") {
    res.status(400).json({ msg: 'Campo "Nome de Usuário" é obrigatório.' }) 
  }
  if (typeof body.email === "undefined" || body.email === "") {
    res.status(400).json({ msg: 'Campo "Email" é obrigatório.' });
  }

  if (typeof body.remember === "undefined" || body.remember === "") {
    res.status(400).json({ msg: 'Campo "Lembre-me" é obrigatório.' });
  }
  if (typeof body.password === "undefined" || body.password === "") {
    res.status(400).json({ msg: 'Campo "Senha" é obrigatório.' }) 
  }
  if (
    typeof body.confirmPassword === "undefined" ||
    body.confirmPassword === ""
  ) {
    res.status(400).json({ msg: 'Campo "Confirmar Senha" é obrigatório.' }) 
  }

  if (body.password !== body.confirmPassword) {
    res.status(400).json({ msg: 'As senhas não conferem.' }); 
  }

  next() 
} 

const validateLogin = (req, res, next) => {
  const { body } = req 

  if (typeof body.username === "undefined" || body.username === "") {
    res.status(400).json({ msg: 'Campo "Nome de Usuário" é obrigatório.' }) 
  }
  if (typeof body.password === "undefined" || body.password === "") {
    res.status(400).json({ msg: 'Campo "Senha" é obrigatório.' }) 
  }

  next() 
} 

module.exports = {
  validateRegister,
  validateLogin,
} 
