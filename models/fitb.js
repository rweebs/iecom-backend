const mongoose = require('mongoose');
const { Schema } = mongoose;

const fitbSchema = new Schema({
    question: {
        type :String,
        required: true,
        unique:true
    },
    image:{
        type :String,
        required: true,
    },
    answer:{
        type:Number,
        required:true,
    }
    
},{timestamps:true});

const FITB = mongoose.model('FITB',fitbSchema)

module.exports= FITB