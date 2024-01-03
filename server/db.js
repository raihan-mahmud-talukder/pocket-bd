const mongoose = require('mongoose')

const mongoURL = 'mongodb+srv://admin:root@cluster0.iugfw.mongodb.net/pocket-bd'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Database connection failed')
})

connection.on('connected', () => {
    console.log('Database connected successfully')
})

module.exports = mongoose