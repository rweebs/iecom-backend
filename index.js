// Dependency
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app=express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const dotenv = require('dotenv');
const swaggerOptions ={
  swaggerDefinition:{
    openapi: '3.0.0',
    info:{
      title: "IECOM API",
      description:" IECOM API Documentation",
      contact:{
        name:"Rahmat Wibowo"
      },
      servers:["http://localhost:8000"]
    }
  },
  apis:['./route/*.js','index.js']
}
const swaggerDocs= swaggerJsDoc(swaggerOptions)


// get config vars
dotenv.config();
const competitionRouter=require('./route/competition.route')
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
app.use(competitionRouter)
app.use("/api/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))
require('./route/users.route')(app);
require('./route/teams.route')(app);

const path = require('path');

const fs = require('fs');

app.listen(process.env.PORT || 5000,function(){
    console.log(`listening to port${process.env.PORT || 5000}`)
})


