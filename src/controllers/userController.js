const getUsers = (req, res, next) => {
    try{
        res.status(200).json({
            message: 'Users were returned',
        })
    }
    catch (error){
        next(error)
    }
}

module.exports = {getUsers}