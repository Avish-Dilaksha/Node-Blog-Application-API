const { CustomError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let custom = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong please try again later'
    }

    return res.status(custom.statusCode).json({message: custom.message})
}

module.exports = errorHandlerMiddleware