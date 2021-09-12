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
    answer:{
        type:String,
        required:true,
    }
    
},{timestamps:true});

const Team = mongoose.model('Question',questionSchema)

module.exports= Team