const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamsSchema = new Schema({
    competition:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
      },
    team_name:{
        type: String,
        required:true
    },
    member:[
        {
            name:{
                type:String
            }
        }
    ]
})

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
    major:{
        type: String
    },
    image: {
        type :String,
        default:"",
    },
    competition:[
        teamsSchema
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
const Teams = mongoose.model('Teams',teamsSchema)
module.exports= {
    User,
    Teams
 }