const bcrypt = require('bcrypt');
const saltRounds = 10;
const User =require('../models/users')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
        const user =new User({
            email:req.body.email,
            password: encryptedPassword,
            name:req.body.name,
            phone:req.body.phone,
            university: req.body.university
        })
        await user.save((err,result)=>{
                if(err){
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                }
                else{
                    res.status(200).json({
                        status:"SUCCESS",
                        message:"User Successfully created",
                        data:result
                    })
                }
            })

      
    },
    login: async (req,res)=>{
        const password = req.body.password;    
        const user = await User.findOne({email:req.body.email})
            if(user===null){
                return (res.status(404).json({
                    status: "FAILED",
                    message: "email is not registered"
                }))
            }
            if(user.status==="Pending"){
                return (res.status(401).json({
                    status: "FAILED",
                    message: "account hasn't been verified"
                }))
            }
            
            
        
        const comparison = await bcrypt.compare(password, user.password)
                if(!comparison){
                    return (res.status(401).json({
                        status: "FAILED",
                        message: "email and password didn't match"
                    }) ) 
                }
                else{
                    const token = generateAccessToken({ email: req.body.email });
                    return (res.status(200).json({
                        status: "SUCCESS",
                        message: "user is successfully login",
                        token:token
                    }))
                }

      
    },
}