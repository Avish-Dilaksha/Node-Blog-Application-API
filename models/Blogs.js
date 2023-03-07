const mongoose = require('mongoose')

const BlodSchema = new mongoose.model({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Blogs', BlodSchema)