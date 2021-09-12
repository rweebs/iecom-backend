const mongoose = require('mongoose');
const { Schema } = mongoose;

const competitionSchema = new Schema({
    name: {
        type :String,
        required: true,
        unique:true
    },
    stage: {
        type :String,
        required: true,
    },
},{timestamps:true});

const Competition = mongoose.model('Competition',competitionSchema)

module.exports= Competition