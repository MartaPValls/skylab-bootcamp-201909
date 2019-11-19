const { Schema } = require('mongoose')

module.exports =  new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastAcces: {
        type: Date
    }
})