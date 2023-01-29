const User = require('../models/user.model');

const findUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.json({
    status: 'success',
    message: 'the user where found succesfully',
    users,
  });
};

const findUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'the user was not found',
    });
  }

  res.json({
    status: 'success',
    message: 'user has found succesfully',
    user,
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'the user was created succesfully',
    newUser,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  const updateUser = await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'user was not found',
    });
  }

  res.json({
    status: 'success',
    message: 'user was updated succesfully',
    updateUser,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'user was not found',
    });
  }

  await user.update({ status: false });

  res.json({
    status: 'success',
    message: 'user delete was succesfully',
  });
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
