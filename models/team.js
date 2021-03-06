const mongoose = require('mongoose');
const { Schema } = mongoose;
const {MCQ} = require('../models/mcq')

const mcqSchema = new Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MCQ"
      },
    answer:{
        type:String,
        enum:['A','B','C','D','E'],
    },
    isFlagged:{
        type:Boolean,
        default:false
    },
})

const tfSchema = new Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TF"
      },
    answer:{
        type:Boolean
    },
    isFlagged:{
        type:Boolean,
        default:false
    },
})

const fitbSchema = new Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FITB"
      },
    answer:{
        type:Number
    },
    isFlagged:{
        type:Boolean,
        default:false
    },
})

const memberSchema = new Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
    name:{
        type: String,
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
    wa: {
        type :Boolean
    },
    wa_number:{
        type:String
    },
    post:{
        type:String
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
        type :String
    },
    mcq:[mcqSchema],
    tf:[tfSchema],
    fitb:[fitbSchema],
    status:{
        type:String,
        enum:["Pending","Verified","Passed","Failed"],
        default:"Verified"
    },
    bank_account:{
        type:String
    },
    card_holder:{
        type:String
    },
    payment_link:{
        type:String
    },
    post:{
        type:String
    },
    score:{
        type: Number
    },
    referral:{
        type: String
    },
    session_1:{
        type:Date,
    },
    session_2:{
        type:Date,
    },
    is_submited:{
        type:Boolean,
        default:false
    },
    is_submited_2:{
        type:Boolean,
        default:false
    },
    sheet_id:{
        type:String
    },
    final_cash:{
        type:Schema.Types.Decimal128
    },
    current_year:{
        type:String,
        default:'2022'
    },
    session_3:{
        type:Date,
    },
    server:{
        type:String,
        default:"./server11.json"
    },
    isStartedSession2:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Team = mongoose.model('Team',teamSchema)
const MCQA = mongoose.model('mcqa',mcqSchema)
const TFA = mongoose.model('tfa',tfSchema)
const FITBA = mongoose.model('fitba',fitbSchema)
const Member = mongoose.model('Member',memberSchema)

module.exports= {
    Team,MCQA,TFA,FITBA,Member
}