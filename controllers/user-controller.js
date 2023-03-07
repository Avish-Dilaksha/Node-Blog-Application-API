const asyncWrapper = require('../middlewares/async')
const { StatusCodes } = require('http-status-codes')
const { NotFound, BadRequest, UnAuthorized } = require('../errors')

const bycrypt = require('bcryptjs')

const User = require('../models/User')

const getAllUsers = asyncWrapper( async (req, res, next) => {
    const users = await User.find()
    if(!users) {
        throw new NotFound('No users found', StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).json({users})
})

const signUp = asyncWrapper( async(req, res, next) => {
    const { name, email, password } = req.body
    const exsistingUser = await User.findOne({ email })
    if(exsistingUser) {
        throw new UnAuthorized(`User with email id : ${email} already exsists`, StatusCodes.UNAUTHORIZED)
    }

    const hashedPassword = bycrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })
    await user.save()
     res.status(StatusCodes.CREATED).json({user})
})

const login = asyncWrapper( async (req, res, next) => {
    const { email, password } = req.body
    const exsistingUser = await User.findOne({ email })
    if(!exsistingUser) {
        throw new NotFound(`User with email id : ${email} already exsists`, StatusCodes.NOT_FOUND)
    }

    const isPasswordCorrect = bycrypt.compareSync(password, exsistingUser.password)
    if(!isPasswordCorrect) {
        throw BadRequest('Incorrect password', StatusCodes.BAD_REQUEST)
    }

    res.status(StatusCodes.OK).json({message: "Logged in succesfully"})
})


module.exports = {
    getAllUsers,
    signUp,
    login,
}