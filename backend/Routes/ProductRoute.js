const ProductRoute = require('express').Router();
const Product = require('../Models/ProductModel');
const { checkAuthorization ,checkadmin} = require('../Middleware/Auth');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        
        var filetype = '';
        if(file.mimetype === 'image/png') {
          filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
          filetype = 'jpg';
        }
        
        cb(null, 'image-' + Date.now() + '.' + filetype);
      }
    });
const upload = multer({ storage: storage })

ProductRoute.get('/', async (req, res) => { 
    await Product.find()
    .populate("Catagory","Catagoryname")
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Something Wrong",Error: `${err}`});
        console.log(err);
    })
})

//getproductbycatagories
ProductRoute.get('/catagory/:id', async (req, res) => {
    await Product.find({Catagory:req.params.id})
    .populate("Catagory","Catagoryname")
    .then((data)=> {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "Cant find",Error: `${err}`})
    })
})

ProductRoute.get('/:id', async (req,res) => {
    await Product.findById(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Something Wrong",Error: `${err}`})
    })
})

ProductRoute.post('/add',checkadmin,upload.single('file'), async (req ,res) => {
    if(!req.file){
        res.status(400).send('dont have image pls check it.')
    }
    else{
        const imageurl = req.protocol+'://'+req.get('host')+'/public/'+req.file.filename
        req.body.ImagePath = imageurl;
        console.log(req.body.ImagePath);
        await Product.create(req.body)
        .then((data)=> {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(500).json({message: "cant create product",Error: `${err}`});
        })
    }
})

ProductRoute.put('/update/:id',checkadmin,upload.single('file'), async (req, res) => {
    if(req.file){
        await Product.findById(req.params.id)
        .then((data) => {
        let pathsplit = data.ImagePath.split('/');
        let pathdel = 'public/'+pathsplit[4];
        fs.unlinkSync(pathdel,(err) => {console.log(err)})
    })
        const imageurl = req.protocol+'://'+req.get('host')+'/public/'+req.file.filename
        req.body.ImagePath = imageurl;
    }
    await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "cant update",Error: `${err}`})
    })
})

ProductRoute.delete('/delete/:id',checkadmin, async (req, res) => {
    await Product.findById(req.params.id)
    .then((data) => {
        let pathsplit = data.ImagePath.split('/');
        let pathdel = 'public/'+pathsplit[4];
        fs.unlinkSync(pathdel,(err) => {console.log(err)})
    })
    await Product.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json({message: "cant delete",Error: `${err}`})
    })
})

module.exports = ProductRoute