const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const {Essay,Member} = require('../models/essay');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Competition = require('../models/competition');
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "admin.bistleague.com"});

// get config vars
dotenv.config();

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '50000s' });
  }

module.exports ={
    create: async (req,res)=>{
        const user1= await User.findOne({email:req.body.member1_email})
        const user2= await User.findOne({email:req.body.member2_email})
        let user3;
        if(req.body.member3){
            user3= await User.findOne({email:req.body.member3_email})
        }
        const member1= new Member({
            member:user1,
            university_id:req.body.member1_university_id,
            university_id_link:req.member1,
            id_line:req.body.member1_id_line,
            preference:req.body.member1_preference
        })
        const member2= new Member( {
            member:user2,
            university_id:req.body.member2_university_id,
            university_id_link:req.member2,
            id_line:req.body.member2_id_line,
            preference:req.body.member2_preference
        })
        let member3;
        if(req.body.member3){
            member3= new Member({
                member:user3,
                university_id:req.body.member3_university_id,
                university_id_link:req.member3,
                id_line:req.body.member3_id_line,
                preference:req.body.member3_preference
            })
        }
        let members;
        if (req.body.member3){
            members=[member1,member2,member3]
        }
        members=[member1,member2]
        const team = new Essay({
            name: req.body.team_name,
            member:members,
            university:req.body.university,
            payment_link:req.payment,
            card_holder:req.body.cardholder,
            bank_account:req.body.bank_account,
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
        await team.save((err,result)=>{
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
        const competition= await Competition.findOne({name:"ESSAY COMPETITION"})
        console.log(competition)
        const team = await Essay.findOne({name:req.query.name,status:"Pending"})
        console.log(team)
        if(!team){
            return (res.status(404).json({
                status: "FAILED",
                message: "team not found"
            }))
        }
        const user1 = await User.findByIdAndUpdate(team.member[0].member,{"$push": {"competition": competition}})
        const user2 = await User.findByIdAndUpdate(team.member[1].member,{"$push": {"competition": competition}})
        if(team.member.length==3){
            const user3 = await User.findByIdAndUpdate(team.member[2].member,{"$push": {"competition": competition}})
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
        return(res.status(200).json({
                status:"SUCCESS",
                message:"Team Successfully verified"
            }))
    
    }
}