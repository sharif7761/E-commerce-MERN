const {validationResult} = require('express-validator')
const {errorResponse} = require("../controllers/responseController");

const runValidation = (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return errorResponse(res, {
                statusCode: 422,
                message:errors.array()[0].msg
            })
        }
        return next();
    }
    catch (err){
        return next(err)
    }
}

module.exports = {runValidation}