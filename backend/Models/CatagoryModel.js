const mongoose = require('mongoose');
const CatagorySchema = new mongoose.Schema({
    Catagoryname:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
})
const Catagory = mongoose.model('Catagory', CatagorySchema)
module.exports = Catagory;