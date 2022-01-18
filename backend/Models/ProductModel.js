const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    ImagePath:{
        type:String,
        required:true
    },
    Productname:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Detail:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    Catagory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Catagory',
        required:true
    },
    CreatedDate:{
        type:Date,
        default: Date.now()
    }

})
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;