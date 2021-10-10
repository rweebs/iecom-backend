const bcrypt = require('bcrypt');
const saltRounds = 10;
const {User} =require('../models/users')
const dotenv = require('dotenv');
const EventRegist = require('../models/event-regist');
const Event = require('../models/event');
const {uploadMediaEvent} = require('../pkg/image-upload')
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "admin.bistleague.com"});

// get config vars
dotenv.config();

module.exports ={
    create_paid: async (req,res)=>{
        console.log(req.payment)
        const member= await User.findOne({email:req.email})
        const event= await Event.findOne({name:req.body.event_name})
        if(!event){
            return(res.status(400).json({
                status: "FAILED",
                message: 'event not found'
            }))
        }
        const registrant = new EventRegist({
            member:member,
            event:event,
            payment_link:req.body.payment_link,
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
                        message:"Event Successfully Registered",
                    }))
                }
            })

      
    },
    create_unpaid: async (req,res)=>{
        const member= await User.findOne({email:req.email})
        const event= await Event.findOne({name:req.body.event_name})
        if(!event){
            return(res.status(400).json({
                status: "FAILED",
                message: 'event not found'
            }))
        }
        const user = await User.updateOne({email:req.email},{"$push": {"event": event}})
        const registrant = new EventRegist({
            member:member,
            event:event,
            payment_link:"unpaid",
            status:"Verified",
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
                        message:"Event Successfully Registered",
                    }))
                }
            })

      
    },
    activate:async (req,res)=>{
        const member= await User.findOne({email:req.query.email})
        const event= await Event.findOne({name:req.query.event_name})
        if(!event){
            return (res.status(404).json({
                status: "FAILED",
                message: "event not found"
            }))
        }
        const user = await User.updateOne({email:req.query.email},{"$push": {"event": event}})
        try{
        const team =await EventRegist.updateOne({email:req.query.email,event:event},{status:"Verified"})
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