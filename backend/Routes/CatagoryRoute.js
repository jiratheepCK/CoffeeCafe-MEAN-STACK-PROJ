const CatagoryRoute = require('express').Router();
const Catagory = require('../Models/CatagoryModel');
const {checkAuthorization ,checkadmin} = require('../Middleware/Auth');


CatagoryRoute.get('/', async (req, res ) => {
    await Catagory.find()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Something Wrong",Error: `${err}`});
        console.log(err);
    })
});

CatagoryRoute.get('/:id', async(req, res) => {
    await Catagory.findById(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Something Wrong",Error: `${err}`})
    })
})

CatagoryRoute.post('/add',checkadmin , async(req, res) =>{
    await Catagory.create(req.body)
    .then((data)=>{
        res.status(201).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "cant create catagory",Error: `${err}`});
    })
})

CatagoryRoute.put('/update/:id',checkadmin , async (req, res) =>{
    await Catagory.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=> {
        res.status(500).json({message:"cannot update",Error: `${err}`});
    })
})

CatagoryRoute.delete('/delete/:id',checkadmin, async (req, res) =>{
    await Catagory.findByIdAndDelete(req.params.id)
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=> {
        res.status(500).json({message:"cannot delete",Error: `${err}`});
    })
})

module.exports = CatagoryRoute;