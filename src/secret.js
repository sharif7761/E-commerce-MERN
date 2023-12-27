require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/ecomMERNDB"

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/user-default.jpg'

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'sadasrersd45405'

module.exports = {serverPort, mongodbURL, defaultImagePath, jwtActivationKey}