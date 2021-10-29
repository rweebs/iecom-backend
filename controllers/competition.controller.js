const Competition = require("../models/competition")
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    create: async (req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const competition = new Competition({
                name:req.body.name,
                stage: req.body.stage,
                isAvailable:false
            })
            await competition.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"Competition Successfully created",
                        data:result
                    }))
                }
            })
        }
        else{
            return(res.status(400).json({
                status: "FAILED",
                message: "Mau ngapain Hayo...."
            }))
        }
        
    },
    update: async(req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const competition = Competition.findOne({name:req.body.name})
            competition.stage=req.body.stage
            competition.isAvailable=req.body.isAvailable
            
            await competition.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"Competition Successfully updated",
                        data:result
                    }))
                }
            })
        }
        else{
            return(res.status(400).json({
                status: "FAILED",
                message: "Mau ngapain Hayo...."
            }))
        }
    },
    get: async (req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const compe = await Competition.findOne({name:req.body.name})
            console.log(compe)
            console.log(compe._id.toString())
            return(res.status(400).json({
                status: "FAILED",
                message: "Mau ngapain Hayo...."
            }))
        }
        else{
            return(res.status(400).json({
                status: "FAILED",
                message: "Mau ngapain Hayo...."
            }))
        }
        
    }
}