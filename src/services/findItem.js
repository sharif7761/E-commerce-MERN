const CreateError = require("http-errors");
const mongoose = require("mongoose");

const findById = async (Model, id, options= {}) => {
    try {
        const item = await Model.findById(id, options)

        if(!item) {
            throw CreateError(404, `No ${Model.modelName} found`)
        }
        return item;
    }
    catch (error) {
        if(error instanceof mongoose.Error){
            throw (CreateError(404, `Invalid ${Model.modelName} id`))
            return
        }
        throw error;
    }
}

module.exports = {findById}