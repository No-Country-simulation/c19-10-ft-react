const UsersService = require("../services/users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CLIENT_BASE_URL } = process.env;

const usersService = new UsersService();

require("dotenv").config();
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.userPlan ? user.userPlan : user.plan,
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.userPlan ? user.userPlan : user.plan,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

const updateUserPlan = (req, res) => {
  try {
    const user = req.body;
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.userPlan ? user.userPlan : user.plan,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.userPlan ? user.userPlan : user.plan,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({ token: accessToken, refresh: refreshToken });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error al actualizar tokens del usuario", error });
  }
};

const register = async (req, res) => {
  try {
    const user = await usersService.register(req.body);
    res.status(201).json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email o contraseña inválidos" });
    }
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: "Error al iniciar sesión", error });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const tokens = generateTokens(user);
    res.json(tokens);
  });
};

const updatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetUrl = `${CLIENT_BASE_URL}/reset-password?token=${token}`;
    if (email) await usersService.updatePassword(email, resetUrl);
    res
      .status(200)
      .json({ message: "Email de reinicio de contraseña enviado" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al actualizar contraseña", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (req.query.token) {
      await usersService.resetPassword(email, password);
    }
    res.status(200).send({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const AllUsers = await usersService.findUsers();
    res.status(200).json({ message: "Usuarios encontrados:", AllUsers });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.findById(id);
    res
      .status(200)
      .json({ message: `Usuario con id: ${id}, encontrado`, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getByName = async (req, res) => {
  try {
    const { name } = req.params;
    const userByName = await usersService.findByName(name);
    res
      .status(200)
      .json({ message: `Usuario con nombre: ${name}, encontrado`, userByName });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await usersService.updateUser(id, body);
    res
      .status(200)
      .json({ message: `Usuario con id: ${id}, actualizado`, updatedUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await usersService.deleteUser(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  refreshToken,
  register,
  login,
  updateUserPlan,
  get,
  getById,
  getByName,
  update,
  updatePassword,
  resetPassword,
  _delete,
};
