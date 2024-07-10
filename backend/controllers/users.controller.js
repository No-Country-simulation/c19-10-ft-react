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
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

const get = async (req, res) => {
  try {
    console.log("Looking for users");
    // const response = await service.findAll();
    // res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    console.log("Searching specific user");
    // const { id } = req.params;
    // const response = await service.findOne(id);
    // res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    console.log("Updating user data");
    // const { id } = req.params;
    // const body = req.body;
    // const response = await service.update(id, body);
    // res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    console.log("Deleting user");
    // const { id } = req.params;
    // const response = await service.delete(id);
    // res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  get,
  getById,
  update,
  _delete,
};
