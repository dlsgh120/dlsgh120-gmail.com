const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
        type:String,
        trim: true
    },
    boardId: {
        type:String,
        trim: true
    },
    content: {
        type:String,
        trim: true,
        required: [true, 'Please add some text']
    },
    userName: {
        type: String,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Reviews = mongoose.model('reviews',ReviewSchema);