const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const dotenv = require('dotenv');
const EventRegist = require('../models/event-regis');
const Event = require('../models/event');
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "admin.bistleague.com"});

// get config vars
dotenv.config();

module.exports ={
    create: async (req,res)=>{
        const member= await User.findOne({email:req.body.email})
        const event= await Event.findOne({name:req.body.eventName})
        if(!event){
            return(res.status(400).json({
                status: "FAILED",
                message: 'event not found'
            }))
        }
        const registrant = new EventRegist({
            name: req.body.name,
            member:member,
            email:req.body.email,
            university:req.body.university,
            payment_link:req.payment,
            major:req.body.major,
            status:"Pending",
        })

        // try{
        // const data = {
        //     from: 'Admin Bist League <noreply@admin.bistleague.com>',
        //     to: req.body.member1.email,
        //     cc:'rahmat.wibowo21@gmail.com',
        //     subject: 'Registered',
        //     text: `Dear ${(req.body.team_name).toUpperCase()},

        //     Please wait for confirmation
        //     `
        //   };
          
        //   mailgun.messages().send(data, (error, body) => {
            
        //   });
        // }
        // catch (err){
        //     return(res.status(400).json({
        //         status: "FAILED",
        //         message: err.message
        //     }))
        // }
        await registrant.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"Team Successfully created",
                        data:result
                    }))
                }
            })

      
    },
    activate:async (req,res)=>{
        const member= await User.findOne({email:req.body.email})
        const event= await Event.findOne({name:req.body.eventName})
        if(!event){
            return (res.status(404).json({
                status: "FAILED",
                message: "team not found"
            }))
        }
        const user = await User.updateOne({email:req.body.email},{"$push": {"event": event}})
        try{
        const team =await EventRegist.updateOne({email:req.body.email,event:event},{status:"Verified"})
        }
        catch(e){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        return(res.status(200).json({
                status:"SUCCESS",
                message:"Event Successfully verified"
            }))
    
    }
}