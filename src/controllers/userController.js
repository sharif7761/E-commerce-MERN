const User = require('../models/userModel')
const CreateError = require('http-errors')
const {successResponse} = require("./responseController");
const mongoose = require('mongoose')
const fs = require('fs')
const {findById} = require("../services/findItem");

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
        fs.access(userImagePath, (err) => {
            if(err){
                console.error('user image does not exits')
            } else {
                fs.unlink(userImagePath, (error) => {
                    if(error) throw error
                    console.log('user image is deleted')
                })
            }
        })

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

module.exports = {getUsers, getSingleUser, deleteUser}