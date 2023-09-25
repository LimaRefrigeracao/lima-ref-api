const usersModel = require("../models/usersModel");

const register = async (req, res) => {
  const { username, email, password, remember } = req.body;

  const checkExists = await usersModel.checkUsersExists(email, username);

  if (checkExists[0] == 1) {
    res.status(422).json({ msg: "Este email já tem uma conta ativa." });
  } else if (checkExists[1] == 1) {
    res
      .status(422)
      .json({ msg: "Este nome de usuário já está sendo utilizado." });
  } else if (checkExists[0] == 1 && checkExists[1] == 1) {
    res
      .status(422)
      .json({ msg: "Este nome de usuário e email já estão cadastrados." });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const dataUser = { username, email, passwordHash, remember };

  try {
    await usersModel.register(dataUser);
    return res.status(200).json(register);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao entar registrar usuário." });
  }
};

module.exports = {
  register,
};
