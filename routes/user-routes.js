const express = require('express')

const { getAllUsers, signUp, login } = require('../controllers/user-controller')

const userRouter = express.Router()

//userRouter.route('/').get(getAllUsers).post(signUp).post(login)
userRouter.route('/').get(getAllUsers)
userRouter.route('/signup').post(signUp)
userRouter.route('/login').post(login)



module.exports = userRouter