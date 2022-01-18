const mongoose = require('mongoose');
const ReceiptSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productinorder:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number
            },
        }
    ],
    totalprice:{
        type:Number,
        required:true
    },
    payment:{
        type:Boolean,
        default:false
    },
    process:{
        type:String,
        enum:['wait', 'inprocess', 'served', 'Cancel'],
        default:"wait"
    },
    table:{
        type:Number,
        default:0
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
})
const Receipt = mongoose.model('Receipt', ReceiptSchema)
module.exports = Receipt;