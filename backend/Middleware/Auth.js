const jwt = require('jsonwebtoken');

const checktoken = (req, res ,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(token){
        jwt.verify(token, process.env.TOKEN_KEY ,(err, user) => {
            if(err){
                res.status(403).json("Invalid Token, Expired Token");
            }
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("You need to Authenticated")
    }
}
const checkAuthorization = (req, res, next) => {
    checktoken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role){
            next();
        }
        else{
            res.status(403).json("You have not allowed to use it")
        } 
    })
}
const checkadmin = (req, res, next) => {
    checktoken(req, res, () => {
        if(req.user.role){
            next();
        }
        else{
            res.status(403).send(req)
        }
    })
}

module.exports = { checktoken, checkAuthorization ,checkadmin}