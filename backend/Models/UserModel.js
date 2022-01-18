const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        min:6,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    giftpoint:{
        type:Number,
        default:0
    },
    role:{
        type:Boolean,
        default:false
    },
    Token:{
        type : String
    },
    CreateDate:{
        type : Date,
        default: Date.now()
    }
    
})
const Catagory = mongoose.model('User', UserSchema)
module.exports = Catagory;