const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const {defaultImagePath} = require('../secret')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: [3, 'Name must be more than 3 characters'],
        maxLength: [30, 'Name must be less than 31 characters'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        minLength: [3, 'Name must be more than 3 characters'],
        maxLength: [30, 'Name must be less than 31 characters'],
        validate: {
            validator:  function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "please enter a valid email"
        },
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: [6, 'password must be more than 6 characters'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: Buffer,
        contentType: String,
        required: [true, 'User image is required'],
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
    },
    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

const User = model('Users', userSchema)
module.exports = User