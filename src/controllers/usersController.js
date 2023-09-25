const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const checkExists = await usersModel.checkUsersExists(email, username);

  if (checkExists[0] > 0 && checkExists[1] > 0) {
    res
      .status(422)
      .json({ msg: "Este nome de usuário e email já estão cadastrados." });
  } else if (checkExists[0] > 0) {
    res.status(422).json({ msg: "Este email já tem uma conta ativa." });
  } else if (checkExists[1] > 0) {
    res
      .status(422)
      .json({ msg: "Este nome de usuário já está sendo utilizado." });
  } else {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const dataUser = { username, email, passwordHash };

    try {
      const register = await usersModel.register(dataUser);
      return res.status(200).json(register);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao tentar registrar usuário." });
    }
  }
};

const login = async (req, res) => {
  try {
    const login = await usersModel.login(req.body);

    if (login === false) {
      return res
        .status(404)
        .json({ msg: "Nome de usuário ou Senha incorreta." });
    } else {
      try {
        const token = await usersModel.signToken(req.body.remember, login);
        return res.status(200).json({ token: token});
      } catch (error) {
        return res.status(500).json({ msg: "Erro na assinatura do token" });
      }
    }
  } catch (error) {
    return res.status(404).json({ msg: "Erro ao tentar realizar login." });
  }
};

module.exports = {
  register,
  login,
};
