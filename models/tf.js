const mongoose = require('mongoose');
const { Schema } = mongoose;

const tfSchema = new Schema({
    question: {
        type :String,
        required: true,
        unique:true
    },
    answer:{
        type:Boolean,
        required:true,
    }
    
},{timestamps:true});

const Tf = mongoose.model('TF',tfSchema)

module.exports= Tf