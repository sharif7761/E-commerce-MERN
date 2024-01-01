const express = require('express')
const userRouter = express.Router();
const {getUsers, getSingleUser, deleteUser, processRegister, activateUserAccount} = require('../controllers/userController')
const upload = require("../middlewares/uploadFile");
const {validateUserRegistration} = require("../validators/auth");
const {runValidation} = require("../validators");

userRouter.post('/process-register', runValidation, upload.single('image'), processRegister)
userRouter.post('/verify', activateUserAccount)
userRouter.get('/', getUsers)
userRouter.get('/:id', getSingleUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;