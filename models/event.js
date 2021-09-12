const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type :String,
        required: true,
        unique:true
    },
    theme: {
        type :String,
        required: true,
    },
    title: {
        type :String,
        required: true,
    },
    date: {
        type :String,
        required: true,
    },
    hour: {
        type :String,
        required: true,
    },
    link: {
        type :String,
        required: true,
    },
},{timestamps:true});

const Event = mongoose.model('Event',eventSchema)

module.exports= Event