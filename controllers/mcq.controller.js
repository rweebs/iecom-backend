const {MCQ,MCQA} = require("../models/mcq")
const dotenv = require('dotenv');
dotenv.config();
module.exports={
    create: async (req,res)=>{
        if(req.body.api_key==process.env.Pass){
            const option=req.body.option
            let choices=[]
            option.forEach(element => {
                const temp_choice= new MCQA({
                    option:element.option,
                    content:element.content
                })
                choices.push(temp_choice)
            });
            const mcq = new MCQ({
                question:req.body.question,
                choices:choices,
                answer:req.body.answer,
                image:req.body.image
            })
            await mcq.save((err,result)=>{
                if(err){
                    return(res.status(400).json({
                        status: "FAILED",
                        message: err.message
                    }))
                }
                else{
                    return(res.status(200).json({
                        status:"SUCCESS",
                        message:"MCQ Successfully created",
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
            const mcq= await MCQ.find({})
        
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