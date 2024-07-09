const UsersService = require("../services/users.service");

const service = new UsersService();

const create = async (req, res) => {
  try {
    console.log("Creating user");
    // const response = await service.create(req.body);
    // res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
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
  create,
  get,
  getById,
  update,
  _delete,
};
