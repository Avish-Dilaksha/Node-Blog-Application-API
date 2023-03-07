const asyncWrapper = require('../middlewares/async')
const { StatusCodes } = require('http-status-codes')
const { NotFound, BadRequest, UnAuthorized } = require('../errors')

const User = require('../models/User')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const users = await User.find({})
    if(!users) {
        throw new NotFound('No users found', StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).json({users})
})


module.exports = getAllUsers