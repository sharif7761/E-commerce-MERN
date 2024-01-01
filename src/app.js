const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const app = express();
const userRouter = require('./routes/userRouter')
const seedRouter = require('./routes/seedRouter')
const {errorResponse} = require("./controllers/responseController");

const rateLimiter = rateLimit({
    windowMs: 1* 60 * 1000, // 1 minute
    mex: 5,
    message: 'Too many requests form this IP'
})

//app.use(rateLimiter)
app.use(morgan('dev'))
app.use(xssClean())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userRouter)
app.use('/api/seed', seedRouter)

// client error handling
app.use((req, res, next) => {
    // res.status(404).json({message: 'route not found'})
    next(createError(404, 'route not found'))
})

// server error handling
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app;