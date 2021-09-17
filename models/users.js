const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type :String,
        required: true,
        unique:true
    },
    password: {
        type :String,
        required: true
    },
    name: {
        type :String,
        required: true,
    },
    university: {
        type :String,
        required: true,
    },
    phone: {
        type :String,
        required: true,
    },
    image: {
        type :String,
        default:"",
    },
    competition:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competition"
          }
    ],
    event:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
          }
    ],
    status:{
        type:String,
        enum:["Pending","Verified"],
        default:"Pending"
    },
    act_token:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema)

module.exports= User 