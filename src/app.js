const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// client error handling
app.use((req, res, next) => {
    // res.status(404).json({message: 'route not found'})
    next(createError(404, 'route not found'))
})

// server error handling
app.use((err, req, res, next) => {
    console.log(res)
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})

module.exports = app;