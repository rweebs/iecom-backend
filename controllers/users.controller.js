const bcrypt = require('bcrypt');
const saltRounds = 10;
const {User,Teams} =require('../models/users')
const Competition =require('../models/competition')
const Event = require('../models/event')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { set } = require('mongoose');
const mail=require('../views/user-verification')
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "iecom.id"});
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
        const email = req.body.email.toLowerCase()
        const test= await User.findOne({email:email})
        if(test){
            return (res.status(400).json({
                status: "FAILED",
                data:test,
                message: "email has already exist"
            }))
        }
        // if(!req.image){
        //     return (res.status(400).json({
        //         status: "FAILED",
        //         data:test,
        //         message: "image not found"
        //     }))
        // }
        const user =new User({
            email:email,
            password: encryptedPassword,
            name:req.body.name,
            university: req.body.university,
            phone:req.body.phone,
            major:req.body.major,
            image:req.body.image,
            status:"Pending",
            act_token:token,
        })
        
        try{
        const data = {
            from: 'Admin IECOM <noreply@iecom.id>',
            to: email,
            subject: 'Accepted',
            html:mail.message(req.body.name,`https://iecom-backend-dev.herokuapp.com/api/users/activate?token=${token}`)
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
    login: async (req, res) => {
        const password = req.body.password;
        const user = await User.findOne({
            email: req.body.email.toLowerCase()
        })
        if (user === null) {
            return (res.status(404).json({
                status: "FAILED",
                message: "email is not registered"
            }))
        }
        if (user.status === "Pending") {
            return (res.status(403).json({
                status: "FAILED",
                message: "account hasn't been verified"
            }))
        }
    
    
    
        const comparison = await bcrypt.compare(password, user.password)
        if (!comparison) {
            return (res.status(401).json({
                status: "FAILED",
                message: "email and password didn't match"
            }))
        } else {
            const token = generateAccessToken({
                email: req.body.email.toLowerCase()
            });
            let competition = []
            let event = []
            for (const element of user.competition) {
                const temp = await Competition.findById(element.competition)
                const team_name = element.team_name
                const name = []
                for (const member of element.member) {
                    name.push(member.name)
                }
                result = {
                    name: temp.name,
                    stage: temp.stage,
                    isAvailable: temp.isAvailable,
                    team_name: team_name,
                    members: name
                }
                competition.push(result)
            }
            for (const element of user.event) {
                const temp = await Event.findById(element)
                event.push(temp)
            }
            const {
                email,
                name,
                university,
                phone,
                image
            } = user
            const data = {
                name,
                email,
                university,
                phone,
                image,
                competition,
                event
            }
            return (res.status(200).json({
                status: "SUCCESS",
                token: token,
                data
    
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
            return ( res.redirect(301, 'https://iecom.asia?login=true'))
        })
    },
    get:async(req,res)=>{
        const user= await User.findOne({email:req.email})
        if(!user){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        const {email,name,university,major,phone,image}=user
        const data={
            name,
            email,
            university,
            phone,
            major,
            image
        }
        return (res.status(200).json({
            status: "SUCCESS",
            data

        }))
    },
    update:async(req,res)=>{
        const user= await User.findOne({email:req.email})
        if(!user){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let {email,name,university,phone,image,major}=user
        if(req.body.name){
            name=req.body.name
        }
        if(req.body.email){
            email=req.body.email
        }
        if(req.body.university){
            university=req.body.university
        }
        if(req.body.phone){
            phone=req.body.phone
        }
        if(req.body.image){
            image=req.body.image
        }
        if(req.body.major){
            major=req.body.major
        }
        const data={
            name,
            email,
            university,
            major,
            phone,
            image
        }
        try{
            await User.findOneAndUpdate({email:req.email},data)
        }
        catch(e){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        return (res.status(200).json({
            status: "SUCCESS",
            data

        }))
    },
    reset: async (req,res)=>{
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
        const user = await User.findOne({email:req.body.email})
            if(user===null){
                return (res.status(404).json({
                    status: "FAILED",
                    message: "email is not registered"
                }))
            }
            
            try{
                const data = {
                    from: 'Admin IECOM <noreply@iecom.id>',
                    to: req.body.email,
                    subject: 'Reset Password',
                    html:mail.reset(user.name,`https://iecom-backend.herokuapp.com/api/users/reset?hash=${encryptedPassword}&email=${req.body.email}`)
                  };
                  
                  mailgun.messages().send(data, (error, body) => {
                    return(res.status(200).json({
                        status: "SUCCESS",
                        message: "reset password successfully"
                    }))
                  });
                }
                catch (err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
            
    },
    activate_reset:async (req,res)=>{
        let hash;
        let email;
        try{
            hash=req.query.hash;
            email=req.query.email;    
        }
        catch(e){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        
        const user= await User.findOne({email:email})
        if(user===null){
            return (res.status(404).json({
                status: "FAILED",
                message: "email is not valid"
            }))
        }
        User.updateOne({email:email},{password:hash})
        .then((user,err)=>{
            if(err){
                return (res.status(404).json({
                    status: "FAILED",
                    message: err.message
                }))
            }
            return ( res.redirect(301, 'https://iecom.asia?login=true'))
        })
        
    },
    profile:async(req,res)=>{
        
        const user= await User.findOne({email:req.email})
        if(!user){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let competition=[]
        let event=[]
        for (const element of user.competition) {
                const temp = await Competition.findById(element.competition)
                const team_name=element.team_name
                const name =[]
                for (const member of element.member){
                    name.push(member.name)
                }
                result={
                    name:temp.name,
                    stage:temp.stage,
                    isAvailable:temp.isAvailable,
                    team_name:team_name,
                    members:name
                }
                competition.push(result)
        }
        for (const element of user.event) {
                const temp = await Event.findById(element)
                event.push(temp)
        }
        const {email,name,university,phone,image}=user
        const data={
            name,
            email,
            university,
            phone,
            image,
            competition,
            event
        }
        return (res.status(200).json({
            status: "SUCCESS",
            data

        }))
    },
}