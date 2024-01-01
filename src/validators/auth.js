const {body} = require('express-validator')

// registration validation
const validateUserRegistration = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 3, max: 31})
        .withMessage('Name should be 3-31 characters long'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email should be 3-31 characters long')
]


module.exports = {validateUserRegistration}
