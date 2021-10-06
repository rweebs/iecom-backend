const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const Competition =require('../models/competition')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { set } = require('mongoose');
const email=require('../views/email')
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "admin.bistleague.com"});
const nodemailer = require('nodemailer')
let transport = nodemailer.createTransport({
  host: "smtp.pepipost.com",
  port: 25,
  auth: {
    user: "rahmatwibowoitb",
    pass: "rahmatwibowoitb_b52152c0b476575a5be41f4411550d47"
  }
});
// get config vars
dotenv.config();

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '50000s' });
  }

module.exports ={
    create: async (req,res)=>{
        let encryptedPassword;
        try{
            const password = req.body.password;    
            encryptedPassword = await bcrypt.hash(password, saltRounds)
        }
        
        catch (err){
            res.status(400).json({
                status: "FAILED",
                message: err.message
            })
        }
        const token=require('crypto').randomBytes(64).toString('hex')
        const test= await User.findOne({email:req.body.email})
        if(test){
            return (res.status(400).json({
                status: "FAILED",
                data:test,
                message: "email has already exist"
            }))
        }
        if(!req.image){
            return (res.status(400).json({
                status: "FAILED",
                data:test,
                message: "image not found"
            }))
        }
        const user =new User({
            email:req.body.email,
            password: encryptedPassword,
            name:req.body.name,
            university: req.body.university,
            phone:req.body.phone,
            major:req.body.major,
            image:req.image,
            status:"Pending",
            act_token:token,
        })
        
        try{
        const data = {
            from: 'Admin Bist League <noreply@admin.bistleague.com>',
            to: req.body.email,
            subject: 'Accepted',
            html:email.message(req.body.name,`https://iecom-backend-dev.herokuapp.com/api/users/activate?token=${token}`)
          };
          
          mailgun.messages().send(data, (error, body) => {
            
          });
        }
        catch (err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        // await user.save((err,result)=>{
        //         if(err){
        //             return(res.status(400).json({
        //                 status: "FAILED",
        //                 message: err.message
        //             }))
        //         }
        //         else{let message={
        //             from:'embedded@pepisandbox.com',
        //             to:req.body.email,
        //             subject:'Verification',
        //             html:email.message(req.body.name,`https://iecom-backend-dev.herokuapp.com/api/activate?token=${token}`)
        //         };
        //         transport.sendMail(message,(err,info)=>{
        //             if(err){
        //                 res.status(400).json({
        //                     status: "FAILED",
        //                     message: err
        //                 })
                        
        //             }
        //             return(res.status(200).json({
        //                 status:"SUCCESS",
        //                 message:"User Successfully created",
        //                 data:result
        //             }))})
                    
        //         }
        //     })

            await user.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                return(res.status(200).json({
                        status:"SUCCESS",
                        message:"User Successfully created",
                        data:result
                    }))
                    
                }
            )
      
    },
    login: async (req,res)=>{
        const password = req.body.password;    
        const user = await User.findOne({email:req.body.email})
            if(user===null){
                return (res.status(404).json({
                    status: "FAILED",
                    message: "email is not registered"
                }))
            }
            if(user.status==="Pending"){
                return (res.status(401).json({
                    status: "FAILED",
                    message: "account hasn't been verified"
                }))
            }
            
            
        
        const comparison = await bcrypt.compare(password, user.password)
                if(!comparison){
                    return (res.status(401).json({
                        status: "FAILED",
                        message: "email and password didn't match"
                    }) ) 
                }
                else{
                    const token = generateAccessToken({ email: req.body.email });
                    return (res.status(200).json({
                        status: "SUCCESS",
                        message: "user is successfully login",
                        token:token
                    }))
                }

      
    },
    activate:async (req,res)=>{
        const token=req.query.token

        const user= await User.findOne({act_token:token,status:"Pending"})
        if(user===null){
            return (res.status(404).json({
                status: "FAILED",
                message: "token is not valid"
            }))
        }
        User.updateOne({act_token:token,status:"Pending"},{status:"Verified"})
        .then((user,err)=>{
            if(err){
                return (res.status(404).json({
                    status: "FAILED",
                    message: err.message
                }))
            }
            return ( res.redirect(301, 'https://bistleague.com'))
        })
    },
    get:async(req,res)=>{
        
        const user= await User.findOne({email:req.email}).select({password:0,act_token:0})
        let competition=[]
        for (const element of user.competition) {
                const temp = await Competition.findById(element)
                competition.push(temp.name)
        }
        const {email,name,university,phone,image}=user
        const data={
            name,
            email,
            university,
            phone,
            image,
            competition
        }
        return (res.status(200).json({
            status: "SUCCESS",
            data

        }))
    },
}