const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;