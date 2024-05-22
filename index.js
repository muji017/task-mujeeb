require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose')
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const port = process.env.PORT;
const connectDB=require('./connect_db')
const userRoute=require('./router/router')

connectDB()
// Endpoints
app.use('/',userRoute);

//
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});