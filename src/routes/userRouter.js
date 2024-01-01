const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser, deleteUser, processRegister, activateUserAccount} = require('../controllers/userController')
const upload = require("../middlewares/uploadFile");

userRouter.post('/process-register', upload.single('image'), processRegister)
userRouter.post('/verify', activateUserAccount)
userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;