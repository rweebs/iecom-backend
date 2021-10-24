const mongoose = require('mongoose');
const { Schema } = mongoose;
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
        type :Boolean,
        required: true
    },
    wa_number:{
        type:String,
        required:true
    }
})

const essaySchema = new Schema({
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
    referral:{
        type: String
    },
    status:{
        type:String,
        enum:["Pending","Verified","Passed","Failed"],
        default:"Pending"
    },
    bank_account:{
        type:String,
        required:true
    },
    card_holder:{
        type:String,
        required:true
    },
    payment_link:{
        type:String
    }
},{timestamps:true});

const Essay = mongoose.model('Essay',essaySchema)

module.exports= {
    Essay
}