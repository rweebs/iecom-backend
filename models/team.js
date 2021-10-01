const mongoose = require('mongoose');
const { Schema } = mongoose;

const qaSchema = new Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },
    answer:{
        type:String,
        required:true,
        enum:['A','B','C','D','E'],
    }
})

const memberSchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
    university_id:{
        type: String
    },
    university_id_link:{
        type: String
    },
    id_line:{
        type: String
    },
    preference:{
        type: String,
        enum:['WhatsApp','Telegram','Email']
    }
})

const teamSchema = new Schema({
    name: {
        type :String,
        required: true,
        unique:true
    },
    member:[memberSchema],
    university: {
        type :String,
        required: true
    },
    qa:[qaSchema],
    status:{
        type:String,
        enum:["Pending","Verified","Passed","Failed"],
        default:"Pending"
    },
    payment_link:{
        type:String
    },
    score:{
        type: Number
    }
},{timestamps:true});

const Team = mongoose.model('Team',teamSchema)
const QA = mongoose.model('Qa',qaSchema)
const Member = mongoose.model('Member',memberSchema)

module.exports= {
    Team,QA,Member
}