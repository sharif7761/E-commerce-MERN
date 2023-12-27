const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser, deleteUser, processRegister} = require('../controllers/userController')

userRouter.post('/process-register', processRegister)
userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;