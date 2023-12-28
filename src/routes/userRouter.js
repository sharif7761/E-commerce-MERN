const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser, deleteUser, processRegister, activateUserAccount} = require('../controllers/userController')

userRouter.post('/process-register', processRegister)
userRouter.post('/verify', activateUserAccount)
userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;