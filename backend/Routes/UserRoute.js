const UserRoute = require('express').Router();
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const {checktoken, checkAuthorization ,checkadmin} = require('../Middleware/Auth');

UserRoute.get('/',checkadmin, async (req, res) => {
    await User.find()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Cant find",Error: `${err}`});
    })
})

UserRoute.get('/:id',checkAuthorization, async (req, res) => {
    await User.findById(req.params.id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(500).json({message: "Cant find",Error: `${err}`});
    })
})

UserRoute.put('/update/:id',checkAuthorization, async (req, res) => {
    //encrpytpassword = await bcrypt.hash(password , 10);
    //const {firstname,lastname,email,password:encrpytpassword} = req.body;
    await User.findByIdAndUpdate(req.params.id, {$set:req.body})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Cant update",Error: `${err}`})
    })
})

UserRoute.delete('/delete/:id',checkadmin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json({message: "Cant delete",Error: `${err}`})
    })
})

module.exports = UserRoute;