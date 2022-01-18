const ReceiptRoute = require('express').Router();
const Receipt = require('../Models/ReceiptModel');
const { checkAuthorization ,checkadmin} = require('../Middleware/Auth');
const { checkstatus } = require('../Middleware/ReceiptMW');

ReceiptRoute.get('/',checkadmin, async (req,res) =>{
    await Receipt.find()
    .populate("user","firstname lastname")
    .populate("productinorder.product","Productname Price")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        rs.status(400).json({message: "Cant find",Error: `${err}`})
    })
})

ReceiptRoute.get('/:id',checkAuthorization, async(req, res) => {
    await Receipt.findById(req.params.id)
    .populate("user","firstname lastname")
    .populate("productinorder.product","Productname Price")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant find",Error: `${err}`})
    })
})

//findallreceipt1userwithid
ReceiptRoute.get('/user/:id',checkAuthorization, async (req,res) =>{
    await Receipt.find({user:req.params.id})
    .populate("user","firstname lastname")
    .populate("productinorder.product","Productname Price")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant find",Error: `${err}`})
    })
})

ReceiptRoute.post('/add', async(req, res) => {
    await Receipt.create(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant create",Error: `${err}`})
    })
})

ReceiptRoute.put('/update/:id', checkadmin, async(req, res) => {
    await Receipt.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant update",Error:`${err}`})
    })
})

ReceiptRoute.delete('/delete/:id',checkAuthorization, checkstatus ,async (req, res) => {
    await Receipt.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant delete",Error:`${err}`})
    })
        
})


module.exports = ReceiptRoute;