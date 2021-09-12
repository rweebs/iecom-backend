const mongoose = require('mongoose');
const { Schema } = mongoose;


const eventRegisSchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    major:{
        type: String
    },
    payment_link:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Verified"],
        default:"Pending"
    },
},{timestamps:true});

const Essay = mongoose.model('Event-Regis',essaySchema)

module.exports= Essay