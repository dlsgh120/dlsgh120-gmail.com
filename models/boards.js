const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BoardSchema = new Schema({
    userId: {
        type:String,
        trim: true
    },
    userEmail: {
        type: String,
        trim:true
    },
    userName: {
        type: String,
        trim:true
    },
    count:{
        type: Number,
        trim:true
    },
    title:{
        type:String,
        trim:true,
        required: [true, 'Please add some text']
    },
     content:{
        type:String,
        trim:true,
        required: [true, 'Please add some text']
    },
    count:{
        type: Number,
        trim:true
    },
    view:{
        type: Number,
        trim:true
    },
    boardsDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = Board = mongoose.model('boards',BoardSchema);