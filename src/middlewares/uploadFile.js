const multer = require('multer')
const path = require('path')
const {uploadDirectory} = require("../secret");

const UPLOAD_DIR = uploadDirectory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '-' + file.originalname.replace(extname, '') + extname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;