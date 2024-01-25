const express = require('express')

const router = express.Router()

const Product = require('../models/product')

router.get('/getallproducts', async (req, res) => {
    const { limit, skip } = req.query
    try {
        const products = await Product.find({}).skip(skip).limit(limit)
        res.send(products)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/getproductbyid', async (req, res) => {
    const { productid } = req.body
    try {
        const product = await Product.findById(productid)
        res.send(product)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

module.exports = router