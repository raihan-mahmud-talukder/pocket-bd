const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)

// reviews: [{
//     username: { type: String},
//     review: String
// }, {
//     username: Sabbir,
//     review: "This is good"
// }{
//     username: Sabbir,
//     review: "This is good"
// }{
//     username: Sabbir,
//     review: "This is good"
// }]


// Products.findAndUpdate({ id: 1}, { $set: { username: 'Sabbir', review: "erevire"}})