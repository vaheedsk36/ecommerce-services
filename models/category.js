const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:String,
    countInStock:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('Category',categorySchema);