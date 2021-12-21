const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamsSchema = new Schema({
    competition:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition",
      },
    team_name:{
        type: String
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
        unique:true
    },
    password: {
        type :String,
        required: true
    },
    name: {
        type :String
    },
    university: {
        type :String
    },
    phone: {
        type :String
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
        default:"Verified"
    },
    act_token:{
        type:String
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema)
const Teams = mongoose.model('Teams',teamsSchema)
module.exports= {
    User,
    Teams
 }