const mongoose = require('mongoose');
const { Schema } = mongoose;

const choiceSchema= new Schema({
    option:{
        type:String,
        required:true,
        enum:['A','B','C','D','E']
    },
    content:{
        type:String,
        required:true
    }
})

const questionSchema = new Schema({
    question: {
        type :String,
        required: true,
        unique:true
    },
    choices:[choiceSchema],
    image:{
        type :String,
    },
    answer:{
        type:String,
        required:true,
        enum:['A','B','C','D','E']
    }
    
},{timestamps:true});

const MCQ = mongoose.model('MCQ',questionSchema)
const MCQA = mongoose.model('MCQA',choiceSchema)

module.exports= {MCQ,MCQA}