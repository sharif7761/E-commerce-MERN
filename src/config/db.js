const mongoose = require('mongoose');
const {mongodbURL} = require("../secret");
const connectDB = async (options={}) => {
    try{
        await mongoose.connect(mongodbURL, options);
        console.log('DB connected...');
        mongoose.connection.on('error', (error) => {
            console.error('DB connection error', error)
        })
    }
    catch (err) {
        console.log(err.toString())
    }
}

module.exports = connectDB