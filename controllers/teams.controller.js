const bcrypt = require('bcrypt');
const saltRounds = 10;
const {MCQ} = require("../models/mcq")
const {User,Teams} =require('../models/users')
const TF = require("../models/tf")
const FITB = require("../models/fitb")
const {Team,Member,MCQA,TFA,FITBA} = require('../models/team');
const {pending,success} = require('../views/main-competition')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Competition = require('../models/competition');
const { MachineLearning } = require('aws-sdk');
var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: "iecom.id"});

// get config vars
dotenv.config();

module.exports ={
    create: async (req,res)=>{
        const user1= await User.findOne({email:req.email})
        const user2= await User.findOne({email:req.body.member2_email})
        
        let user3;
        if(req.body.member3_email){
            user3= await User.findOne({email:req.body.member3_email})
            if(!user2 && !user3){
                return(res.status(404).json({
                    status: "FAILED",
                    message: "Member 1's and Member 2s'email have not been registered yet on our website"
                }))
            }
            if(!user3){
                return(res.status(404).json({
                    status: "FAILED",
                    message: "Member 2's email has not been registered yet on our website"
                }))
            }
        }
        if(!user2){
            return(res.status(404).json({
                status: "FAILED",
                message: "Member 1's email has not been registered yet on our website"
            }))
        }
        const member1= new Member({
            member:user1,
            name:req.body.member1_name,
            university_id:req.body.member1_university_id,
            university_id_link:req.body.member1_university_id_link,
            id_line:req.body.member1_id_line,
            wa:req.body.member1_wa,
            wa_number:req.body.member1_wa_number,
            post:req.body.member1_post
        })
        const member2= new Member( {
            member:user2,
            name:req.body.member2_name,
            university_id:req.body.member2_university_id,
            university_id_link:req.body.member2_university_id_link,
            id_line:req.body.member2_id_line,
            wa:req.body.member2_wa,
            post:req.body.member2_post,
            wa_number:req.body.member2_wa_number
        })
        let member3;
        if(req.body.member3_email){
            member3= new Member({
                member:user3,
                name:req.body.member3_name,
                university_id:req.body.member3_university_id,
                university_id_link:req.body.member3_university_id_link,
                id_line:req.body.member3_id_line,
                wa:req.body.member3_wa,
                wa_number:req.body.member3_wa_number,
                post:req.body.member3_post
            })
        }
        let members;
        members=[member1,member2]
        if (req.body.member3_email){
            members=[member1,member2,member3]
        }
        const team = new Team({
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
                            message:"Team Successfully created",
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
        const competition= await Competition.findOne({name:"MAIN COMPETITION"})
        const team = await Team.findOne({name:req.query.name,status:"Pending"})
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
        const user2 = await User.findByIdAndUpdate(team.member[1].member,{"$push": {"competition": teams}})
        if(team.member.length==3){
            const user3 = await User.findByIdAndUpdate(team.member[2].member,{"$push": {"competition": teams}})
        }
        try{
        const team =await Team.updateOne({name:req.query.name},{status:"Verified"})
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
                    message:"Team Successfully verified",
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
    populate:async(req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const team= Team.findOne({name:req.body.name})
            if(!team){
                return(res.status(400).json({
                    status: "FAILED",
                    message: "Team not found"
                }))
            }
            let mcqa=[]
            let tfa=[]
            let fitba=[]
            
            const mcq= await MCQ.find({})
            // Shuffle array
            const shuffled = mcq.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            let selected = shuffled.slice(0, 3);

            

            selected.forEach(element => {
                const temp_mcq=new MCQA(
                    {question: element}
                )

                mcqa.push(temp_mcq)
                
            })
             
            
            const tf= await TF.find({})
            // Shuffle array
            const shuffled_tf = tf.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            let selected_tf = shuffled_tf.slice(0, 3);

            

            selected_tf.forEach(element => {
                const temp_tf=new TFA(
                    {question: element}
                )

                tfa.push(temp_tf)
                
            })
            const fitb= await FITB.find({})
            // Shuffle array
            const shuffled_fitb = fitb.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            let selected_fitb = shuffled_fitb.slice(0, 3);

            

            selected_fitb.forEach(element => {
                const temp_fitb=new FITB(
                    {question: element._id}
                )

                fitba.push(temp_fitb)
                
            }) 
            let result
            try{
            result = await Team.findOneAndUpdate({name:req.body.name},{mcq:mcqa,tf:tfa,fitb:fitba})
            }

            catch(e){
                return(res.status(500).json({
                    status: "FAILED",
                    message: e.message
                }))
            }
            return(res.status(200).json({
                status: "SUCCESS",
                data: result
            }))
            
        }
        else{
            return(res.status(400).json({
                status: "FAILED",
                message: "Mau ngapain Hayo...."
            }))
        }
    },
    getQuestion: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let tf =[]
        for (const element of team.tf) {
            const temp = await TF.findById(element.question)
            const {_id,question}=temp
            answer={_id,question}
            tf.push(answer)
        }
        return(res.status(200).json({
            status: "SUCCESS",
            data:tf
        })) 

    },
    answer: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        if (team.tf[req.query.page-1]){
            team.tf[req.query.page-1].answer=req.query.answer
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        await team.save((err,result)=>{
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
    question: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let question
        if (team.mcq[req.query.page-1]){
            try{
                question = await MCQ.findById(team.mcq[req.query.page-1].question)
            }
            catch(e){
                return(res.status(400).json({
                    status: "FAILED",
                    message: "NaN"
                }))
            }
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        const data ={
            question:question.question,
            choices:question.choices
        }
        return(res.status(200).json({
            status:"SUCCESS",
            data:data
        }))

    },
    getQuestion_tf: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let tf =[]
        for (const element of team.tf) {
            const temp = await TF.findById(element.question)
            const {_id,question}=temp
            answer={_id,question}
            tf.push(answer)
        }
        return(res.status(200).json({
            status: "SUCCESS",
            data:tf
        })) 

    },
    answer_tf: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        if (team.tf[req.query.page-1]){
            team.tf[req.query.page-1].answer=req.query.answer
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        await team.save((err,result)=>{
            if(err){
                return(res.status(400).json({
                    status: "FAILED",
                    message: err.message
                }))
            }
            return(res.status(200).json({
                    status:"SUCCESS",
                    message:"User Successfully created",
                    data:team
                }))
                
            }
        )
        

    },
    question_tf: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let question
        if (team.tf[req.query.page-1]){
            try{
                question = await TF.findById(team.tf[req.query.page-1].question)
            }
            catch(e){
                return(res.status(400).json({
                    status: "FAILED",
                    message: "NaN"
                }))
            }
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        const data ={
            question:question.question
        }
        return(res.status(200).json({
            status:"SUCCESS",
            data:data
        }))

    },
    getQuestion_fitb: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let fitb =[]
        for (const element of team.fitb) {
            const temp = await FITB.findById(element.question)
            const {_id,question}=temp
            answer={_id,question}
            fitb.push(answer)
        }
        return(res.status(200).json({
            status: "SUCCESS",
            data:fitb
        })) 

    },
    answer_fitb: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        if (team.fitb[req.query.page-1]){
            team.fitb[req.query.page-1].answer=req.query.answer
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        await team.save((err,result)=>{
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
    question_fitb: async (req,res)=>{
        let team
        try{
        team = await Team.findOne({name:req.team})
        
        }
        catch(err){
            return(res.status(400).json({
                status: "FAILED",
                message: err.message
            }))
        }
        let question
        if (team.fitb[req.query.page-1]){
            try{
                question = await FITB.findById(team.fitb[req.query.page-1].question)
            }
            catch(e){
                return(res.status(400).json({
                    status: "FAILED",
                    message: "NaN"
                }))
            }
        }else{
            return(res.status(400).json({
                status: "FAILED",
                message: "NaN"
            }))
        }
        const data ={
            question:question.question
        }
        return(res.status(200).json({
            status:"SUCCESS",
            data:data
        }))

    }
        
}