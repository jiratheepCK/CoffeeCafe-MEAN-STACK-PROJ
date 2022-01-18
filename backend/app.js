const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
require('./Config/database').connect();
const allroute = require('./Routes/index');

const Port = process.env.Port || 4000;

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', allroute);
app.use ('/public', express.static('./public'));
app.listen(Port, () =>{
    console.log(`Server running on port ${Port}`);
})