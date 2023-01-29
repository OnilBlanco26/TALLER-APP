const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });

    res.json({
      status: 'success',
      message: 'the users were found successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'failed to find users',
      error,
    });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'the user was not found',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'user was found successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'failed to find user',
      error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      status: 'success',
      message: 'user was created successfully',
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'failed to create user',
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'user was not found',
      });
      return;
    }

    const updateUser = await user.update({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
    });

    res.json({
      status: 'success',
      message: 'user was updated successfully',
      updateUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'failed to update user',
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user was not found',
      });
    }

    await user.update({ status: 'not available' });

    return res.json({
      status: 'success',
      message: 'user delete was succesfully',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
