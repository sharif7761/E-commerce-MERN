const User = require("../models/userModel");
const CreateError = require("http-errors");
const mongoose = require("mongoose");

const findUserById = async (id) => {
    try {
        const options = {password: 0}
        const user = await User.findById(id, options)

        if(!user) {
            throw CreateError(404, 'No user found')
        }
        return user;
    }
    catch (error) {
        if(error instanceof mongoose.Error){
            throw (CreateError(404, 'Invalid user id'))
            return
        }
        throw error;
    }
}

module.exports = {findUserById}