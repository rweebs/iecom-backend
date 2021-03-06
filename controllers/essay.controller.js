const bcrypt = require('bcrypt');
const saltRounds = 10;
const {User,Teams} =require('../models/users')
const {Essay} = require('../models/essay');
const {Member} = require('../models/team');
const {pending,success} = require('../views/main-competition');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Competition = require('../models/competition');
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "iecom.id"});

// get config vars
dotenv.config();
module.exports ={
    create: async (req,res)=>{
        const user1= await User.findOne({email:req.email})        
        let user2;
        if(req.body.member2_email){
            user2= await User.findOne({email:req.body.member2_email})
            if(!user2){
                return(res.status(404).json({
                    status: "FAILED",
                    message: "Member 1's email has not been registered yet on our website"
                }))
            }
        }
        const member1= new Member({
            member:user1,
            name:req.body.member1_name,
            university_id:req.body.member1_university_id,
            university_id_link:req.body.member1_university_id_link,
            id_line:req.body.member1_id_line,
            wa:req.body.member1_wa,
            wa_number:req.body.member1_wa_number
        })
        let member2;
        if(req.body.member2_email){
            member2= new Member({
                member:user2,
                name:req.body.member2_name,
                university_id:req.body.member2_university_id,
                university_id_link:req.body.member2_university_id_link,
                id_line:req.body.member2_id_line,
                wa:req.body.member2_wa,
                wa_number:req.body.member2_wa_number
            })
        }
        let members;
        
        members=[member1]
        if (req.body.member2_email){
            members=[member1,member2]
        }
        const team = new Essay({
            name: req.body.team_name,
            member:members,
            university:req.body.university,
            payment_link:req.body.payment_link,
            card_holder:req.body.cardholder,
            bank_account:req.body.bank_account,
            referral:req.body.referral,
            status:"Pending",
        })

        
        await team.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    try{
                    const data = {
                        from: 'Admin IECOM <noreply@iecom.id>',
                        to: req.email,
                        subject: 'Registration under review',
                        html:pending(req.body.team_name)
                      };
                      
                      mailgun.messages().send(data, (error, body) => {
                        return(res.status(200).json({
                            status:"SUCCESS",
                            message:"Essay Successfully created",
                            data:result
                        }))
                      });
                    }
                    catch (err){
                        return(res.status(400).json({
                            status: "FAILED",
                            message: err.message
                        }))
                    }
                    
                }
            })

      
    },
    activate:async (req,res)=>{
        let member=[]
        const competition= await Competition.findOne({name:"ESSAY COMPETITION"})
        const team = await Essay.findOne({name:req.query.name,status:"Pending"})
        if(!team){
            return (res.status(404).json({
                status: "FAILED",
                message: "team not found"
            }))
        }
        for (const element of team.member) {
            member.push({name:element.name})
        }
        const teams = new Teams({
            competition:competition,
            team_name:req.query.name,
            member:member
        })
        const user1 = await User.findByIdAndUpdate(team.member[0].member,{"$push": {"competition": teams}})
        if(team.member.length==2){
            const user2 = await User.findByIdAndUpdate(team.member[1].member,{"$push": {"competition": teams}})
        }
        try{
        const team =await Essay.updateOne({name:req.query.name},{status:"Verified"})
        }
        catch(e){
            return (res.status(404).json({
                status: "FAILED",
                message: err.message
            }))
        }
        try{
            const data = {
                from: 'Admin IECOM <noreply@iecom.id>',
                to: user1.email,
                subject: 'Registration success',
                html:success(req.query.name)
              };
              
              mailgun.messages().send(data, (error, body) => {
                return(res.status(200).json({
                    status:"SUCCESS",
                    message:"Essay Successfully verified",
                }))
              });
            }
            catch (err){
                return(res.status(400).json({
                    status: "FAILED",
                    message: err.message
                }))
            }
    
    }
}