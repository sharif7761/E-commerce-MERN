const multer = require('multer')
const path = require('path')
const {uploadDirectory} = require("../secret");
const CreateError = require('http-errors')

const UPLOAD_DIR = uploadDirectory
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 1024 * 1024 * 2
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg','jpeg','png']
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

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname)
    if(!ALLOWED_FILE_TYPES.includes(extname.substring(1))){
        return cb(CreateError(400, 'File format not allowed'))
    }
    cb(null, true)
}
const upload = multer({
    storage: storage,
    limits: {fileSize : MAX_FILE_SIZE},
    fileFilter
})

module.exports = upload;