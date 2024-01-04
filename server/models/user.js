const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    mobile: { type: String },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)