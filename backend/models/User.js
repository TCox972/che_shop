const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    lastName: {type: String, required: true},
    firstName : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    address1 : {type: String, required: true},
    address2 : {type: String},
    zipCode: {type: String, required: true},
    town : {type : String, required: true},
    isAdmin : {type: Boolean, default: false},
}, { timestamps: true })

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)