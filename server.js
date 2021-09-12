// Dependency
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app=express();

const dotenv = require('dotenv');

// get config vars
dotenv.config();

const userRouter=require('./route/users.route')
app.use(cors({
    origin: ['http://localhost:3000','https://bist-dev.herokuapp.com','https://bistleague.azurewebsites.net','https://bistleague.com']
  }));

//established mongoose connection
mongoose.connect(process.env.DATABASE_SECRET, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected")
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(userRouter)

const path = require('path');

const fs = require('fs');

app.listen(process.env.PORT || 5000,function(){
    console.log(`listening to port${process.env.PORT || 5000}`)
})


