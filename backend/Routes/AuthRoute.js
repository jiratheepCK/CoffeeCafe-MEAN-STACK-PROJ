const AuthRoute = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const jwt = require("jsonwebtoken");

AuthRoute.post('/login', async (req, res, err) => {
    const {email, password} = req.body;
    if(!({email} && {password})){
      res.status(400).send("all input is required");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign({id:user._id,role:user.role},process.env.TOKEN_KEY , {expiresIn : "1h"});
      user.token = token;
      res.status(200).json({id:user._id,name:user.firstname,role:user.role,token:user.token});
      console.log(`${email} loging in`);
    }else{
        res.status(400).json({message: "pls check your email and password"})
        console.log(err)
    }
})

AuthRoute.post('/register', async (req, res ) => {
    const {firstname, lastname , email, password} = req.body;
    if(!req.body.role){
        req.body.role = false
    }
    const olduser = await User.findOne({email});
    if(olduser){
      return res.status(409).send({message:'This email already registered'});
    }
    encrpytpassword = await bcrypt.hash(password , 10);
    
    await User.create({firstname, lastname , email, password:encrpytpassword,role:req.body.role})
    .then((data) => {
        res.status(201).json(data);
        
    })
    .catch((err) => {
        res.status(500).json({message: "cant regis",Error: `${err}`})
        console.log(err)
    })
})
AuthRoute.get('/logout', (req,res) => {
    const token =  req.body.token || req.query.token || req.headers["x-access-token"];
    jwt.sign(token, "", { expiresIn: 1 } , (logout, err) => {
      if (logout) {
      res.send(`You already log out ${token}`);
      } 
      else {
      res.send(err);
      }
    })
})

module.exports = AuthRoute;