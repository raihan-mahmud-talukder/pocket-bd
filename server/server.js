const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))

const dbConfig = require('./db')

app.use(express.json())

app.use(cors())

const productRoute = require('./routes/product')
const usersRoute = require('./routes/user')
// const feedbackRoute = require('./routes/feedback')

app.use('/api/products', productRoute)
app.use('/api/users', usersRoute)
// app.use('/api/feedbacks', feedbackRoute)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))