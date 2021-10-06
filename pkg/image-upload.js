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
            const filename = req.headers.directory+'/'+file.originalname
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
        req.iamge=req.files[0].location
        next()
    })
}

module.exports={
    uploadMediaUser
}
