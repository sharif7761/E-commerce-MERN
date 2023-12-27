const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expiresIn) => {
    if(typeof payload !== 'object' || !payload){
        throw new Error('Payload must not be non-empty object')
    }
    try {
        const token = jwt.sign(payload, secretKey, {expiresIn});
        return token
    }
    catch (error){
        throw error
    }
}

module.exports = { createJSONWebToken }