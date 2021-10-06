const Event = require("../models/event")
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    create: async (req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const event = new Event({
                name:req.body.name,
                is_paid:req.body.is_paid,
                is_available:req.body.is_available,
                theme:req.body.theme,
                title:req.body.title,
                date:req.body.date,
                hour:req.body.hour,
                link:req.body.link
            })
            await event.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"Event Successfully created",
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
        
    }
    // update: async(req,res)=>{
    //     if(req.body.api_key==process.env.Pass){
    //         const competition = Competition.findOne({name:req.body.name})
    //         competition.stage=req.body.stage
    //         competition.isAvailable=req.body.isAvailable
            
    //         await competition.save((err,result)=>{
    //             if(err){
    //                 return(res.status(400).json({
    //                     status: "FAILED",
    //                     message: err.message
    //                 }))
    //             }
    //             else{
    //                 return(res.status(200).json({
    //                     status:"SUCCESS",
    //                     message:"Competition Successfully updated",
    //                     data:result
    //                 }))
    //             }
    //         })
    //     }
    //     else{
    //         return(res.status(400).json({
    //             status: "FAILED",
    //             message: "Mau ngapain Hayo...."
    //         }))
    //     }
    // }
}