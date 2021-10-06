const mongoose = require('mongoose');
const { Schema } = mongoose;


const eventRegisSchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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

const EventSchema = mongoose.model('Event-Regis',eventRegisSchema)

module.exports= Essay