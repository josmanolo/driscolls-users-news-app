const User = require("../models/User.model");

const notFound = (res) => res.status(404).json({ message: "User not found" });

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return notFound(res);
    }
    res.json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return notFound(res);
    }
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      body: { name, email, password },
    } = req;

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const response = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return notFound(res);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return notFound(res);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
