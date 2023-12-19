const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser} = require('../controllers/userController')

userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)

module.exports = userRouter;