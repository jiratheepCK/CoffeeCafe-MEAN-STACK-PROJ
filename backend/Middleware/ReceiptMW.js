const checkstatus = (req, res ,next) => {
    const status = req.body.process;
    if(status == "wait" || status == "Cancel" || req.user.role){
        next();
    }
    else{
        res.status(403).json("Receipt already accepted")
    }
}

module.exports = { checkstatus }