const UsersService = require("../services/users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersService = new UsersService();

require("dotenv").config();
const { JWT_SECRET } = process.env;

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
    const token = jwt.sign({ name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

const get = async (req, res) => {
  try {
    const AllUsers = await usersService.findUsers();
    res.status(200).json({ message: "These are all the users", AllUsers })
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params
    const userById = await usersService.findById(id)
    res.status(200).json({ message: `User with id: ${id}, finded`, userById })
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getByName = async (req, res) => {
  try {
    const { name } = req.params
    console.log(name)
    const userByName = await usersService.findByName(name)
    res.status(200).json({ message: `User with name: ${name}, finded`, userByName })
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await usersService.findByName(id, body);
    res.status(200).json({ message: `User with id: ${id}, updated`, updatedUser })
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
  get,
  getById,
  getByName,
  update,
  _delete,
};
