const UsersService = require("../services/users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersService = new UsersService();

require("dotenv").config();
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const user = await usersService.register(req.body);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
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
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    if (email) await usersService.updatePassword(email, resetUrl);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error de cosito", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (req.query.token) {
      await usersService.resetPassword(email, password);
    }
    res.status(200).send({ message: "Contraseña actualizada con exito" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const AllUsers = await usersService.findUsers();
    res.status(200).json({ message: "These are all the users", AllUsers });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await usersService.findById(id);
    res.status(200).json({ message: `User with id: ${id}, finded`, userById });
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
      .json({ message: `User with name: ${name}, finded`, userByName });
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
      .json({ message: `User with id: ${id}, updated`, updatedUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await usersService.deleteUSer(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  get,
  getById,
  getByName,
  update,
  updatePassword,
  resetPassword,
  _delete,
};
