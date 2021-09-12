const mongoose = require('mongoose');
const { Schema } = mongoose;


const essaySchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    university_id:{
        type: String
    },
    university_id_link:{
        type: String
    },
    photo_link:{
        type:String
    },
    country:{
        type:String
    },
    payment_link:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Verified","Passed","Failed"],
        default:"Pending"
    },
},{timestamps:true});

const Essay = mongoose.model('Essay',essaySchema)

module.exports= Essay