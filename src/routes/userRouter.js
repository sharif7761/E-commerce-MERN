const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser, deleteUser} = require('../controllers/userController')

userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;