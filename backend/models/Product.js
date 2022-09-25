const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title : {type: String, required: true, unique: true},
    description : {type: String, required: true},
    imageUrl : {type: String, required: true},
    category: {type: Array, required: true},
    size : {type: String},
    color : {type: String},
    price : {type: Number, required: true},
    inStock: {type: Boolean}

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)