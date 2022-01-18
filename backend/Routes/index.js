const Router = require('express').Router();

const AuthRoute = require('./AuthRoute');
const CatagoryRoute = require('./CatagoryRoute');
const ProductRoute = require('./ProductRoute');
const ReceiptRoute = require('./ReceiptRoute');
const UserRoute = require('./UserRoute');


Router.use('/catagory', CatagoryRoute);
Router.use('/product', ProductRoute);
Router.use('/receipt', ReceiptRoute);
Router.use('/user', UserRoute);
Router.use(AuthRoute)


module.exports = Router;