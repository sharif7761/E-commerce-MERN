const User = require('../models/userModel')
const CreateError = require('http-errors')
const {successResponse} = require("./responseController");
const mongoose = require('mongoose')
const {findById} = require("../services/findItem");
const {deleteImage} = require("../helpers/deleteImage");
const {createJSONWebToken} = require("../helpers/jsonwebtoken");
const {jwtActivationKey, clientURL} = require("../secret");
const emailWithNodeMailer = require("../helpers/email");

const getUsers = async (req, res, next) => {
    try{
        const search  = req.query.search || "";
        const page  = Number(req.query.page) || 1;
        const limit  = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*'+ search +'.*', 'i')
        const filter = {
            isAdmin: {$ne: true},
            $or: [
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {phone: {$regex: searchRegExp}},
            ]
        }
        const options = {password: 0}
        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page-1) * limit)

        const count = await User.find().countDocuments(filter)
        if(!users) throw CreateError(404, 'No user found')
        // res.status(200).json({
        //     message: 'Users were returned',
        //     users,
        //     pagination: {
        //         totalPages: Math.ceil(count / limit),
        //         currentPage: page,
        //         previousPage: page - 1 > 0 ? page - 1 : null,
        //         nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        //     }
        // })
        return successResponse(res, {
            statusCode: 200,
            message: 'Users were returned',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })
    }
    catch (error){
        next(error)
    }
}

const getSingleUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const options = {password: 0}
        const user = await findById(User, id, options)

        return successResponse(res, {
            statusCode: 200,
            message: 'User was returned',
            payload: {
                user,
            }
        })
    }
    catch (error){
        if(error instanceof mongoose.Error){
            next(CreateError(404, 'Invalid user id'))
        }
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const options = {password: 0}
        const user = await findById(User, id, options)

        const userImagePath = user.image;
        deleteImage(userImagePath)

        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        })

        return successResponse(res, {
            statusCode: 200,
            message: 'User was deleted',
        })
    }
    catch (error){
        if(error instanceof mongoose.Error){
            next(CreateError(404, 'Invalid user id'))
        }
        next(error)
    }
}

const processRegister = async (req, res, next) => {
    try{
        const {name, email, password, phone, address} = req.body;

        const userExists = await User.exists({email})
        if(userExists){
            throw CreateError(409, 'user already exists')
        }

        //create jwt
        const token = createJSONWebToken({name, email, password, phone, address}, jwtActivationKey, '10m')

        // prepare email
        const emailData = {
            email,
            subject: 'Account activation email',
            html: `
                <h2>Hello ${name} !</h2>
                <p>Please <a href="${clientURL}/api/user/activate/${token}">click here</a> to activate your account !</p>
            `
        }
        try {
            await emailWithNodeMailer(emailData)
        }
        catch (error){
            next(CreateError(500, 'Email sending error'))
            return;
        }

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your email ${email} to complete your registration`,
            payload: {token}
        })
    }
    catch (error){
        if(error instanceof mongoose.Error){
            next(CreateError(404, 'Invalid user id'))
        }
        next(error)
    }
}

const activateUserAccount = async (req, res, next) => {
    try{
        const {name, email, password, phone, address} = req.body;

        const userExists = await User.exists({email})
        if(userExists){
            throw CreateError(409, 'user already exists')
        }

        //create jwt
        const token = createJSONWebToken({name, email, password, phone, address}, jwtActivationKey, '10m')

        // prepare email
        const emailData = {
            email,
            subject: 'Account activation email',
            html: `
                <h2>Hello ${name} !</h2>
                <p>Please <a href="${clientURL}/api/user/verify/${token}">click here</a> to activate your account !</p>
            `
        }
        try {
            await emailWithNodeMailer(emailData)
        }
        catch (error){
            next(CreateError(500, 'Email sending error'))
            return;
        }

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your email ${email} to complete your registration`,
            payload: {token}
        })
    }
    catch (error){
        if(error instanceof mongoose.Error){
            next(CreateError(404, 'Invalid user id'))
        }
        next(error)
    }
}

module.exports = {getUsers, getSingleUser, deleteUser, processRegister, activateUserAccount}