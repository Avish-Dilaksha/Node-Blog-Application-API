const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 3
    }
})

module.exports = mongoose.model('User', UserSchema)