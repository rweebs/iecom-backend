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
        ref: "User"
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

module.exports= Team