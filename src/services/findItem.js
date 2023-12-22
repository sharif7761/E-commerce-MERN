const User = require("../models/userModel");
const CreateError = require("http-errors");
const mongoose = require("mongoose");

const findById = async (id, options= {}) => {
    try {
        const item = await User.findById(id, options)

        if(!item) {
            throw CreateError(404, 'No user found')
        }
        return item;
    }
    catch (error) {
        if(error instanceof mongoose.Error){
            throw (CreateError(404, 'Invalid item id'))
            return
        }
        throw error;
    }
}

module.exports = {findById}