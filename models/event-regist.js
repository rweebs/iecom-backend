const mongoose = require('mongoose');
const { Schema } = mongoose;


const eventRegisSchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
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

const EventRegist = mongoose.model('Event-Regis',eventRegisSchema)

module.exports= EventRegist