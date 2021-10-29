const FITB = require("../models/fitb")
const dotenv = require('dotenv');
dotenv.config();
module.exports={
    create: async (req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const fitb = new FITB({
                question:req.body.question,
                image:req.body.image,
                answer:req.body.answer
            })
            await fitb.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"FITB Successfully created",
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
    random:async(req,res)=>{
        if(req.query.api_key==process.env.Pass){
            const tf= await FITB.find({})
        
            // Shuffle array
            const shuffled = mcq.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            let selected = shuffled.slice(0, 3);

            return (res.status(200).json({
                selected:selected
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