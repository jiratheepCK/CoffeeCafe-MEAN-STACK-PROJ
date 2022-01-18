const mongoose = require("mongoose");
const API_URI = process.env.API_URI;

exports.connect = () => {
    mongoose.connect(API_URI ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
    })
    .then(() => {
    console.log(`Connect to database ${API_URI}`)
    })
    .catch((err) => {
        console.log(`Cannot Connect to database ${API_URI}`)
        console.log(err);
        process.exit(1)
    })} 