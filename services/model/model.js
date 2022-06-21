const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('contact',Schema);