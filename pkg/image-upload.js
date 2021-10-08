const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const endpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com")
require('dotenv').config()

const s3= new aws.S3({
    endpoint:endpoint,
    accessKeyId:process.env.SPACES_KEY,
    secretAccessKey:process.env.SPACES_SECRET
})

const upload= multer({
    storage: multerS3({
        s3,
        bucket:"bowo-testing",
        acl:"public-read",
        contentType:multerS3.AUTO_CONTENT_TYPE,
        key: (req,file,cb)=>{
            const filename = req.headers.directory+'/'+require('crypto').randomUUID()+require('path').extname(file.originalname)
            cb(null,filename);
        }
    })
}).array('file',4);

//Upload Team
const uploadMediaTeam=(req,res,next)=>{
    upload(req,res,err =>{
        if(err){
            return err
        }
        req.payment=req.files[0].location
        req.member1=req.files[1].location
        req.member2=req.files[2].location
        if(req.body.member3_university_id){
            req.member3=req.files[3].location
        }
        
        
        next()
    })
}

//Upload User
const uploadMediaUser=(req,res,next)=>{
    upload(req,res,err =>{
        if(err){
            return err
        }
        req.image=req.files[0].location
        next()
    })
}
const uploadMediaEvent=(req,res,next)=>{
    upload(req,res,err =>{
        if(err){
            return err
        }
        req.payment=req.files[0].location
        next()
    })
}

const uploadSingleFIle=(req,res)=>{
    if(req.headers.key=process.env.Pass){
        upload(req,res,err =>{
            if(err){
                return err
            }
            return (res.status(200).json({link:req.files[0].location}))
        })
    }
    
}
module.exports={
    uploadMediaUser,
    uploadMediaTeam,
    uploadMediaEvent,
    uploadSingleFIle

}
