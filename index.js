// Dependency
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app=express();
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { uploadMedia, uploadSingleFIle } = require('./pkg/image-upload');
const dotenv = require('dotenv');
const {Team}=require('./models/team');
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
const eventRouter=require('./route/events.route')
const mcqRouter=require('./route/mcqs.route')
const tfRouter=require('./route/tfs.route')
const fitbRouter=require('./route/fitbs.route')
app.use(cors({
    origin: ['http://localhost:3000','http://127.0.0.1:5500','https://bist-dev.herokuapp.com','https://bistleague.azurewebsites.net','https://bistleague.com','https://iecom-preview.vercel.app','https://iecom.asia','https://www.iecom.asia','https://iecom-r9q057ntq-vincentiussgk.vercel.app','https://iecom-5kx6gjoxl-vincentiussgk.vercel.app','https://iecom-lhpf2k9ff-vincentiussgk.vercel.app','https://iecom-1s019jagh-vincentiussgk.vercel.app','https://iecom-rn98m7a4a-vincentiussgk.vercel.app']
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
app.use(mcqRouter)
app.use(tfRouter)
app.use(fitbRouter)
app.use(eventRouter)
app.use("/api/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))
require('./route/users.route')(app);
require('./route/teams.route')(app);
require('./route/essays.route')(app);
require('./route/event-regist.route')(app);
app.post("/api/uploads",uploadSingleFIle)
const path = require('path');

const fs = require('fs');
// const test = async () =>{
//   const team = await Team.findOne({name:"tester-final-3"})
//   const date= new Date()
//   console.log(date.getTime())
//   console.log(team.session_1.getTime())
//   console.log(date.getTime()-team.session_1.getTime())
// }
// test()

app.listen(process.env.PORT || 5000,function(){
    console.log(`listening to port${process.env.PORT || 5000}`)
})


